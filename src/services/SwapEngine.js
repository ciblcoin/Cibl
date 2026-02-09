import { Connection, VersionedTransaction } from '@solana/web3.js';
import axios from 'axios';
import bs58 from 'bs58';

class SwapEngine {
  /**
   * ۱. سوآپ داخل شبکه سولانا (Jupiter v6)
   */
  static async performSolanaSwap(userPublicKey, inputMint, outputMint, amountInSol) {
    try {
      const amount = amountInSol * 1e9; // تبدیل به Lamports
      
      // گرفتن بهترین مسیر قیمت (Quote)
      const quoteResponse = await axios.get(
        `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`
      );

      // دریافت دیتای تراکنش برای امضا
      const { data: { swapTransaction } } = await axios.post('https://quote-api.jup.ag/v6/swap', {
        quoteResponse: quoteResponse.data,
        userPublicKey,
        wrapAndUnwrapSol: true,
      });

      return swapTransaction; // این رشته به فرانت‌اند می‌رود تا با Private Key امضا شود
    } catch (error) {
      console.error("Jupiter Swap Error:", error);
      return null;
    }
  }

  /**
   * ۲. سوآپ بین‌زنجیره‌ای (BTC به SOL / ETH)
   * از سرویس ChangeNOW استفاده می‌کنیم که نیازی به احراز هویت (KYC) برای مبالغ پایین ندارد
   */
  static async createCrossChainSwap(fromCurrency, toCurrency, amount, toAddress) {
    const API_KEY = 'YOUR_CHANGENOW_API_KEY';
    try {
      const response = await axios.post(`https://api.changenow.io/v2/exchange`, {
        from: fromCurrency, // e.g., 'btc'
        to: toCurrency,     // e.g., 'sol'
        amount: amount,
        address: toAddress, // آدرس مقصد (مثلاً آدرس سولانای خود کاربر)
        extraId: "",
        userId: "",
        payload: "",
        contactEmail: ""
      }, {
        headers: { 'x-changenow-api-key': API_KEY }
      });

      return response.data; // برگرداندن آدرس واریز بیت‌کوین (Deposit Address)
    } catch (error) {
      console.error("Cross-Chain Swap Error:", error);
      return null;
    }
  }
}

export default SwapEngine;
