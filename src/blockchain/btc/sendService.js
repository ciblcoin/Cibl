import * as bitcoin from 'bitcoinjs-lib';
import { fetchUtxos, broadcastTx } from './transaction';
import { getBtcWallet } from './wallet';

export const sendBitcoin = async (privateKeyWIF, toAddress, amountInSatoshi) => {
  const wallet = getBtcWallet(privateKeyWIF);
  const utxos = await fetchUtxos(wallet.address);
  
  const network = bitcoin.networks.bitcoin;
  const psbt = new bitcoin.Psbt({ network });

  let totalInput = 0;
  // اضافه کردن ورودی‌ها (UTXOs)
  utxos.forEach((utxo) => {
    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      witnessUtxo: {
        script: bitcoin.address.toOutputScript(wallet.address, network),
        value: utxo.value,
      },
    });
    totalInput += utxo.value;
  });

  // تخمین کارمزد (مثلاً ۱۰۰۰ ساتوشی)
  const fee = 1000; 
  const change = totalInput - amountInSatoshi - fee;

  // خروجی اصلی (به مقصد)
  psbt.addOutput({
    address: toAddress,
    value: amountInSatoshi,
  });

  // خروجی باقی‌مانده (برگشت به کیف‌پول خود کاربر)
  if (change > 0) {
    psbt.addOutput({
      address: wallet.address,
      value: change,
    });
  }

  // امضا با موتور امنیتی CiBL
  const signedPsbt = wallet.signTransaction(psbt);
  signedPsbt.finalizeAllInputs();
  
  const txHex = signedPsbt.extractTransaction().toHex();
  return await broadcastTx(txHex); // ارسال به بلاک‌چین
};
