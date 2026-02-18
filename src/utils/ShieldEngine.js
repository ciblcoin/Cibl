import Filter from 'bad-words';

const filter = new Filter();

// اضافه کردن کلمات خاص یا اصطلاحات مخرب دنیای کریپتو (مثل اسکم‌ها)
filter.addWords('scam', 'shill', 'rugpull');

export const shieldMessage = (text) => {
  if (!text) return "";
  
  // ۱. بررسی ۳۰۰ کاراکتر (محدودیتی که قبلاً گذاشتیم)
  const truncatedText = text.substring(0, 300);
  
  // ۲. تمیز کردن کلمات نامناسب
  try {
    return filter.clean(truncatedText);
  } catch (e) {
    // اگر در شناسایی زبان به مشکل خورد، متن اصلی را برمی‌گرداند
    return truncatedText;
  }
};
