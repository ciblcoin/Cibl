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
