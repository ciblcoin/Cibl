import * as Application from 'expo-application';
import { Platform } from 'react-native';
import { supabase } from '../lib/supabase';

class AuthService {
  static async getUniqueId() {
    if (Platform.OS === 'android') {
      return Application.androidId; // شناسه‌ی یکتای اندروید
    } else {
      const iosId = await Application.getIosIdForVendorAsync(); // شناسه‌ی یکتای iOS
      return iosId;
    }
  }

  static async registerWallet(walletAddress, inviterId = null) {
    const deviceId = await this.getUniqueId();

    // ارسال به دیتابیس
    const { data, error } = await supabase.from('profiles').upsert({
      solana_address: walletAddress,
      device_id: deviceId, // این ستون را در مرحله بعد به SQL اضافه می‌کنیم
      referred_by: inviterId
    });

    return { data, error };
  }
}
