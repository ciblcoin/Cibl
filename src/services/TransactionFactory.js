import { Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';
import { 
  SOLANA_RPC, BSC_RPC, 
  SOLANA_FEE_COLLECTOR_ADDRESS, BSC_FEE_COLLECTOR,
  CIBL_SWAP_FEE_BPS 
} from '@env';

/**
 * CiBL Multi-Chain Transaction Factory
 * Handles Challenge Funds & 0.6% Protocol Fees
 */

class TransactionFactory {
  
  // --- SOLANA LOGIC ---
  static async createSolanaChallengeTx(userPubkey, amountInLamports) {
    const connection = new Connection(SOLANA_RPC, 'confirmed');
    const feeAmount = (amountInLamports * CIBL_SWAP_FEE_BPS) / 10000;
    const challengeAmount = amountInLamports - feeAmount;

    const transaction = new Transaction().add(
      // 1. Send 0.6% Fee to CiBL Admin
      SystemProgram.transfer({
        fromPubkey: new PublicKey(userPubkey),
        toPubkey: new PublicKey(SOLANA_FEE_COLLECTOR_ADDRESS),
        lamports: feeAmount,
      }),
      // 2. Send remaining to Escrow (simplified for this example)
      SystemProgram.transfer({
        fromPubkey: new PublicKey(userPubkey),
        toPubkey: new PublicKey("ESCROW_ACCOUNT_PUBKEY"), 
        lamports: challengeAmount,
      })
    );

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = new PublicKey(userPubkey);
    
    return transaction;
  }

  // --- EVM LOGIC (BSC, Polygon, etc.) ---
  static async createEVMTx(userAddress, amountInWei, chainRpc) {
    const provider = new ethers.JsonRpcProvider(chainRpc);
    const feeAmount = (BigInt(amountInWei) * BigInt(CIBL_SWAP_FEE_BPS)) / BigInt(10000);
    const mainAmount = BigInt(amountInWei) - feeAmount;

    // In EVM, we usually bundle this or send separately
    const txData = {
      to: BSC_FEE_COLLECTOR,
      value: feeAmount.toString(),
      gasLimit: 21000,
    };

    return txData;
  }
}

export default TransactionFactory;

static async calculateFeeSplitting(amount, userAddress) {
  // ۱. پیدا کردن معرفِ این کاربر از Supabase
  const { data: profile } = await supabase
    .from('profiles')
    .select('referred_by')
    .eq('address', userAddress)
    .single();

  const totalFee = amount * 0.006; // 0.6%
  let adminShare = totalFee;
  let referrerShare = 0;
  let referrerWallet = null;

  if (profile?.referred_by) {
    // ۲. اگر معرف داشت، بخشی از سود را به او بده
    const { data: referrer } = await supabase
      .from('profiles')
      .select('address')
      .eq('referral_code', profile.referred_by)
      .single();

    if (referrer) {
      referrerShare = totalFee * 0.33; // حدود 0.2% از کل مبلغ
      adminShare = totalFee - referrerShare; // 0.4% باقی‌مانده برای شما
      referrerWallet = referrer.address;
    }
  }

  return { adminShare, referrerShare, referrerWallet };
}
