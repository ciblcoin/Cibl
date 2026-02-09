import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Aes from 'react-native-aes-crypto';

class BackupService {
  /**
   * تولید دیتای رمزنگاری شده برای QR Code
   */
  static async generateEncryptedBackupData(mnemonic, userPassword) {
    const salt = await Aes.randomKey(16);
    const key = await Aes.pbkdf2(userPassword, salt, 5000, 256);
    const iv = await Aes.randomKey(16);
    
    // رمزنگاری کلمات
    const encrypted = await Aes.encrypt(mnemonic, key, iv, 'aes-256-gcm');
    
    // پکیج نهایی شامل دیتای قفل شده و پارامترهای بازگشایی (بدون پسورد)
    return JSON.stringify({ e: encrypted, i: iv, s: salt });
  }

  /**
   * اشتراک‌گذاری یا ذخیره فایل تصویر
   */
  static async exportBackupImage(viewShotUri) {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing is not available on this device");
      return;
    }
    await Sharing.shareAsync(viewShotUri);
  }
}

export default BackupService;
