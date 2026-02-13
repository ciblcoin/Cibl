import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = '@CiBL_Balance_';

export const SmartCache = {
  // ۱. ذخیره موجودی جدید در کش
  setBalance: async (network, balanceData) => {
    try {
      const data = {
        amount: balanceData.amount,
        fiatValue: balanceData.fiatValue, // ارزش دلاری
        lastUpdated: new Date().getTime(),
      };
      await AsyncStorage.setItem(`${CACHE_PREFIX}${network}`, JSON.stringify(data));
    } catch (e) {
      console.error("Cache Save Error", e);
    }
  },

  // ۲. دریافت سریع موجودی از کش (بدون نیاز به شبکه)
  getCachedBalance: async (network) => {
    try {
      const cached = await AsyncStorage.getItem(`${CACHE_PREFIX}${network}`);
      return cached ? JSON.parse(cached) : { amount: '0.00', fiatValue: '0.00', lastUpdated: 0 };
    } catch (e) {
      return { amount: '0.00', fiatValue: '0.00', lastUpdated: 0 };
    }
  },

  // ۳. بررسی اینکه آیا کش خیلی قدیمی شده است یا خیر (مثلاً بیش از ۵ دقیقه)
  isCacheStale: (lastUpdated) => {
    const fiveMinutes = 5 * 60 * 1000;
    return new Date().getTime() - lastUpdated > fiveMinutes;
  }
};
