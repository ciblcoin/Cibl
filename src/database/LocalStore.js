import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalCache = {
  // ذخیره موجودی آخرین بار دیده شده
  saveBalance: async (network, balance) => {
    await AsyncStorage.setItem(`balance_${network}`, JSON.stringify(balance));
  },
  
  // خواندن موجودی برای نمایش آنی (قبل از آپدیت از شبکه)
  getCachedBalance: async (network) => {
    const data = await AsyncStorage.getItem(`balance_${network}`);
    return data ? JSON.parse(data) : '0.00';
  },

  // ذخیره لیست توکن‌های شخصی‌سازی شده کاربر
  saveTokens: async (tokens) => {
    await AsyncStorage.setItem('user_tokens', JSON.stringify(tokens));
  }
};
