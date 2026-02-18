import * as Crypto from 'expo-crypto';
import { ethers } from 'ethers';
import * as bip39 from 'bip39';

export const createNewWallet = async () => {
  try {
    // ۱. تولید انتروپی تصادفی (بسیار امن)
    const randomBytes = await Crypto.getRandomBytesAsync(16); 
    const entropy = Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // ۲. تبدیل انتروپی به ۱۲ کلمه بازیابی (Mnemonic)
    const mnemonic = bip39.entropyToMnemonic(entropy);

    // ۳. استخراج کلید خصوصی و آدرس عمومی از کلمات
    const wallet = ethers.Wallet.fromPhrase(mnemonic);

    return {
      phrase: mnemonic,        // ۱۲ کلمه (باید به کاربر نمایش داده شود)
      address: wallet.address, // آدرس عمومی (مثلاً 0x123...)
      privateKey: wallet.privateKey // کلید خصوصی (باید مخفی بماند)
    };
  } catch (error) {
    console.error("Wallet Creation Failed:", error);
    return null;
  }
};
