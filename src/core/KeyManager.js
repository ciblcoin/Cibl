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

import * as SecureStore from 'expo-secure-store';
import * as bip39 from 'bip39';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const KEY_STORAGE_NAME = 'CIBL_VAULT_SEED';

export const KeyManager = {
  // ۱. تولید عبارت بازیابی جدید و ذخیره امن
  createAndSaveWallet: async () => {
    const mnemonic = bip39.generateMnemonic(); // ۱۲ کلمه
    await SecureStore.setItemAsync(KEY_STORAGE_NAME, mnemonic, {
      keychainAccessible: SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    });
    return mnemonic;
  },

  // ۲. فراخوانی عبارت بازیابی (نیاز به احراز هویت بیومتریک در مراحل بعد)
  getStoredMnemonic: async () => {
    return await SecureStore.getItemAsync(KEY_STORAGE_NAME);
  },

  // ۳. استخراج کلید خصوصی برای هر شبکه (Derivation)
  // این تابع مغز متفکر مولتی-چین است
  derivePrivateKey: async (networkType) => {
    const mnemonic = await KeyManager.getStoredMnemonic();
    if (!mnemonic) throw new Error("Wallet not found");

    const seed = await bip39.mnemonicToSeed(mnemonic);
    
    // استفاده از مسیرهای استاندارد BIP44
    const paths = {
      BTC: "m/84'/0'/0'/0/0",       // Native SegWit
      ETH: "m/44'/60'/0'/0/0",      // Ethereum & EVM
      SOL: "m/44'/501'/0'/0'",      // Solana
      TON: "m/44'/607'/0'/0'/0'",   // TON
    };

    // در اینجا با استفاده از کتابخانه‌های هر شبکه، کلید نهایی تولید می‌شود
    return { seed, path: paths[networkType] };
  },

  // ۴. حذف کیف‌پول (برای خروج از حساب)
  shredWallet: async () => {
    await SecureStore.deleteItemAsync(KEY_STORAGE_NAME);
  }
};
