import { checkTokenSecurity } from './securityScanner';

export const handleSwapRequest = async (tokenAddress, chain) => {
  const securityReport = await checkTokenSecurity(tokenAddress, chain);

  if (securityReport.isHoneypot) {
    alert("❌ هشدار: این توکن مشکوک به کلاهبرداری (Honeypot) است! امکان فروش وجود ندارد.");
    return;
  }

  if (securityReport.sellTax > 10) {
    alert(`⚠️ دقت کنید: کارمزد فروش این توکن ${securityReport.sellTax}% است.`);
  }

  // اگر همه چیز اوکی بود، پروسه سوآپ ادامه می‌یابد
  proceedWithSwap();
};
