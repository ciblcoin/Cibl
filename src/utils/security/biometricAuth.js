// src/utils/security/biometricAuth.js

import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export const authenticateUser = async () => {
  try {
    // ۱. بررسی پشتیبانی سخت‌افزاری
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      // اگر بیومتریک فعال نیست، به سراغ رمز عبور (PIN) می‌رویم
      return false;
    }

    // ۲. درخواست تایید هویت
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'تایید هویت برای ورود به CiBL',
      fallbackLabel: 'استفاده از رمز عبور',
      disableDeviceFallback: false,
    });

    return result.success;
  } catch (error) {
    console.error("Biometric Error:", error);
    return false;
  }
};
