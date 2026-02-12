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
-- ۱. اضافه کردن ستون شناسه دستگاه به پروفایل
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS device_id TEXT;

-- ۲. ایجاد ایندکس برای جستجوی سریع دستگاه‌ها
CREATE INDEX IF NOT EXISTS idx_device_id ON public.profiles(device_id);

-- ۳. تابع جلوگیری از سوءاستفاده رفرال (Sybil Protection)
CREATE OR REPLACE FUNCTION public.block_duplicate_referrals()
RETURNS TRIGGER AS $$
BEGIN
    -- اگر کاربری قبلاً با این Device ID ثبت شده باشد، نباید اجازه دهیم معرف جدیدی ثبت کند
    IF EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE device_id = NEW.device_id 
        AND id != NEW.id 
        AND referred_by IS NOT NULL
    ) THEN
        NEW.referred_by := NULL; -- حذف معرف برای اکانت‌های تکراری روی یک گوشی
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_sybil_protection
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.block_duplicate_referrals();
