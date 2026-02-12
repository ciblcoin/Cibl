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
