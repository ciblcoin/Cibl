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

const SWAP_PROVIDERS = {
  polygon: "https://api.1inch.dev/swap/v6.0/137",
  arbitrum: "https://api.1inch.dev/swap/v6.0/42161",
  base: "https://api.1inch.dev/swap/v6.0/8453",
  aptos: "https://api.panora.exchange/v1/swap", // مثال برای اپتوس
};

export const getSwapRoute = async (chain, fromToken, toToken, amount, slippage = 0.5) => {
  const feeBps = 60; // 0.6% کارمزد CiBL
  const adminWallet = process.env[`${chain.toUpperCase()}_FEE_COLLECTOR`];

  // فراخوانی API مربوط به آن شبکه با احتساب کارمزد ما
  const response = await fetch(`${SWAP_PROVIDERS[chain]}?from=${fromToken}&to=${toToken}&amount=${amount}&fee=${feeBps}&referrer=${adminWallet}`);
  return await response.json();
};
