import * as LocalAuthentication from 'expo-local-authentication';
import FeedbackManager from './FeedbackManager';

class AuthService {
  static async authenticate() {
    try {
      // ۱. بررسی وجود سخت‌افزار بیومتریک
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        return { success: false, error: 'Biometrics not available' };
      }

      // ۲. اجرای اسکن نئونی
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authorize CiBL Access',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        FeedbackManager.playSuccess(); // صدای موفقیت نئونی که قبلاً ساختیم
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}

export default AuthService;
