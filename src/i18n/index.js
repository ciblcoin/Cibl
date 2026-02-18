import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// فایل‌های ترجمه برای بازارهای هدف
import en from './locales/en.json';
import es from './locales/es.json'; // اسپانیایی (آمریکای لاتین و اروپا)
import zh from './locales/zh.json'; // چینی (بازار بزرگ کریپتو)
import jp from './locales/jp.json'; // ژاپنی

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    zh: { translation: zh },
    jp: { translation: jp },
  },
  lng: 'en', // زبان پیش‌فرض: انگلیسی
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import en from './locales/en.json';
import ar from './locales/ar.json'; // فایل ترجمه عربی

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

// این خط بسیار مهم است: تنظیم جهت سیستم بر اساس زبان انتخابی
export const isRTL = i18n.language === 'ar';
export default i18n;

