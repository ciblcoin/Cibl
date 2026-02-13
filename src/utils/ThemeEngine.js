export const getFontByLanguage = (lng) => {
  switch(lng) {
    case 'zh':
    case 'jp':
      return 'NotoSans-Bold'; // فونت بهینه برای کاراکترهای آسیایی
    default:
      return 'Orbitron-Bold'; // فونت نئونی CiBL برای زبان‌های لاتین
  }
};
