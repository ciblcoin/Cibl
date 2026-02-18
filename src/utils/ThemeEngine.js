// در فایل ThemeEngine.js
export const getFontByLanguage = (lng) => {
  switch(lng) {
    case 'ar':
      return 'Cairo-Bold'; // فونت هندسی و مدرن برای عربی
    case 'jp':
      return 'NotoSansJP-Bold';
    default:
      return 'Orbitron-Bold';
  }
};
