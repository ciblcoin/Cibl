/**
 * CiBL Utility Helpers
 * توابع کمکی برای تمیزکاری آدرس‌ها، مبالغ و فرمت‌های زمانی
 */

export const Helpers = {
  /**
   * کوتاه کردن آدرس‌های بلاک‌چین
   * 0x1234567890abcdef1234567890abcdef12345678 -> 0x1234...5678
   */
  shortenAddress: (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  },

  /**
   * فرمت کردن اعداد اعشاری کریپتو
   * 0.000456789 -> 0.00045
   */
  formatCrypto: (amount, precision = 5) => {
    if (!amount) return '0.00';
    return parseFloat(amount).toFixed(precision);
  },

  /**
   * فرمت کردن مبالغ دلاری (Fiat)
   * 54200.5 -> $54,200.50
   */
  formatUSD: (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  },

  /**
   * تبدیل حروف اول به بزرگ (برای نام شبکه‌ها)
   */
  capitalize: (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * شبیه‌سازی تأخیر برای افکت‌های لودینگ نئونی
   */
  delay: (ms) => new Promise(res => setTimeout(res, ms))
};
