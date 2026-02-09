module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ۱. برای شناسایی متغیرهای فایل .env
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      // ۲. برای فعال‌سازی استایل‌های Tailwind (NativeWind)
      'nativewind/babel',
      // ۳. برای انیمیشن‌های روان (Reanimated) - باید همیشه آخرین پلاگین باشد
      'react-native-reanimated/plugin',
    ],
  };
};
