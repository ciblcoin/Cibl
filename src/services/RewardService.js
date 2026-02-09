import { supabase } from '../lib/supabase';
import { Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

class RewardService {
  /**
   * فرآیند نهایی برداشت سود
   */
  static async claimRewards(userAddress) {
    try {
      // ۱. فراخوانی تابع SQL برای صفر کردن موجودی در دیتابیس و گرفتن عدد نهایی
      const { data: amountToPay, error } = await supabase
        .rpc('claim_referral_balance', { user_addr: userAddress });

      if (error || amountToPay <= 0) throw new Error("No rewards to claim");

      // ۲. واریز واقعی ارز (مثلاً SOL) از کیف پول مرکزی CiBL به کاربر
      // نکته: این بخش معمولاً در یک لایه امنیتی در Backend انجام می‌شود
      const txHash = await this.sendFromTreasury(userAddress, amountToPay);

      return { success: true, amount: amountToPay, txHash };
    } catch (e) {
      console.error("Claim Error:", e.message);
      return { success: false, error: e.message };
    }
  }

  static async sendFromTreasury(toAddress, amount) {
    // در اینجا کیف پول مرکزی (Treasury) تراکنش را امضا می‌کند
    // امنیت: کلید خصوصی Treasury باید در محیطی فوق امن (Environment Variables سرور) باشد
    console.log(`Sending ${amount} SOL to ${toAddress}...`);
    return "TX_HASH_FROM_BLOCKCHAIN";
  }
}
