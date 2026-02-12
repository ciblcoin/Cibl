import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

const bip32 = BIP32Factory(ecc);

export const generateMnemonic = () => {
  return bip39.generateMnemonic(); // تولید ۱۲ کلمه تصادفی
};

export const getKeysFromSeed = (mnemonic) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed);

  return {
    // مسیرهای استاندارد برای هر شبکه
    BTC: root.derivePath("m/84'/0'/0'/0/0"),      // Native SegWit
    ETH: root.derivePath("m/44'/60'/0'/0/0"),     // Ethereum & EVM
    SOL: root.derivePath("m/44'/501'/0'/0'"),     // Solana
    TON: root.derivePath("m/44'/607'/0'/0'/0'"),  // TON
    SUI: root.derivePath("m/44'/784'/0'/0'/0'"),  // SUI
  };
};
