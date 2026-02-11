// src/components/TokenIcon.js

const TokenIcon = ({ address, network, symbol }) => {
  // ۱. اولویت اول: لوگوهای محلی برای کوین‌های اصلی
  if (symbol === 'SOL') return require('../../public/tokens/sol.png');
  
  // ۲. اولویت دوم: ساخت لینک بر اساس شبکه و آدرس قرارداد
  const uri = network === 'ethereum' 
    ? `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
    : `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${address}/logo.png`;

  return (
    <Image 
      source={{ uri }} 
      style={{ width: 40, height: 40 }}
      // اگر لوگو پیدا نشد، یک تصویر پیش‌فرض (Placeholder) نشان بده
      defaultSource={require('../../assets/default-token.png')} 
    />
  );
};
