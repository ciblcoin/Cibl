import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';

const ECPair = ECPairFactory(ecc);

export const getBtcWallet = (privateKeyWIF) => {
  // تولید کیف‌پول از روی Private Key
  const keyPair = ECPair.fromWIF(privateKeyWIF);
  
  // تولید آدرس Native SegWit (bech32)
  const { address } = bitcoin.payments.p2wpkh({ 
    pubkey: keyPair.publicKey 
  });

  return {
    address,
    network: 'Bitcoin',
    // تابعی برای امضای تراکنش‌ها
    signTransaction: (psbt) => {
      psbt.signInput(0, keyPair);
      return psbt;
    }
  };
};
