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
export const getTypography = (lng) => {
  return {
    fontFamily: lng === 'ar' ? 'Cairo-Bold' : 'Orbitron-Bold',
    textAlign: lng === 'ar' ? 'right' : 'left',
    flexDirection: lng === 'ar' ? 'row-reverse' : 'row'
  };
};
