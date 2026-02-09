import * as SecureStore from 'expo-secure-store';
import Aes from 'react-native-aes-crypto';

class SecurityVault {
  /**
   * ۱. تولید یک نمک (Salt) تصادفی برای امنیت بیشتر رمز عبور
   */
  static async generateKey(password, salt) {
    // تبدیل پسورد کاربر به یک کلید ۳۲ بایتی (PBKDF2)
    return Aes.pbkdf2(password, salt, 5000, 256);
  }

  /**
   * ۲. ذخیره کلمات بازیابی به صورت رمزنگاری شده در سخت‌افزار
   */
  static async storeMnemonic(mnemonic, userPassword) {
    try {
      const salt = await Aes.randomKey(16);
      const key = await this.generateKey(userPassword, salt);
      const iv = await Aes.randomKey(16);
      
      // رمزنگاری AES-256-GCM
      const encryptedMnemonic = await Aes.encrypt(mnemonic, key, iv, 'aes-256-gcm');

      // ذخیره دیتای رمزنگاری شده و IV/Salt در بخش امن سخت‌افزار
      const vaultData = JSON.stringify({ encryptedMnemonic, iv, salt });
      
      await SecureStore.setItemAsync('cibl_vault', vaultData, {
        keychainService: 'cibl_wallet_service',
        copyburn: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY // امنیت فوق‌العاده بالا
      });

      return true;
    } catch (error) {
      console.error("Encryption Error:", error);
      return false;
    }
  }

  /**
   * ۳. بازگردانی کلمات بازیابی (فقط با پسورد صحیح کاربر)
   */
  static async getMnemonic(userPassword) {
    try {
      const vaultData = await SecureStore.getItemAsync('cibl_vault');
      if (!vaultData) return null;

      const { encryptedMnemonic, iv, salt } = JSON.parse(vaultData);
      const key = await this.generateKey(userPassword, salt);
      
      // رمزگشایی
      const decrypted = await Aes.decrypt(encryptedMnemonic, key, iv, 'aes-256-gcm');
      return decrypted;
    } catch (error) {
      // اگر پسورد اشتباه باشد، اینجا خطا می‌دهد
      return null; 
    }
  }
}

export default SecurityVault;
