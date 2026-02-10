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
// در بخشی از کامپوننت ارسال
const handleSend = async () => {
  try {
    // ۱. پخش صدای شارژ شدن (آماده‌سازی)
    SoundManager.play('TX_CHARGE');
    
    // ۲. شروع انیمیشن پرتاب نئونی
    setIsFlying(true);

    let txHash;
    if (selectedNetwork === 'BTC') {
      txHash = await sendBitcoin(userPrivateKey, recipientAddress, amount);
    } 
    // ... سایر شبکه‌ها (ETH, TON, etc.)

    // ۳. اگر موفق بود: پخش صدای تایید و لرزش
    SoundManager.play('TX_SUCCESS');
    alert(`Transaction Sent: ${txHash}`);
    
  } catch (error) {
    // ۴. در صورت خطا: صدای شکست و لرزش سنگین
    SoundManager.play('TX_FAILED');
    console.error(error);
  } finally {
    setIsFlying(false);
  }
};
