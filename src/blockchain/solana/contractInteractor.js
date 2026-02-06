import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.native";
import idl from "../abis/cibl_gamble.json"; // همان فایل IDL که از ریپازیتوری core می‌آوریم

const PROGRAM_ID = new PublicKey("آدرس_کانتراکت_شما");

export const createDuelChallenge = async (wallet, amount) => {
  // 1. برقراری اتصال به شبکه سولانا
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program(idl, PROGRAM_ID, provider);

  try {
    // 2. ساخت یک اکانت جدید برای ذخیره دیتای چالش
    const challengeAccount = anchor.web3.Keypair.generate();

    // 3. فراخوانی تابع create_challenge از کانتراکت Rust
    const tx = await program.methods
      .createChallenge(new anchor.BN(amount))
      .accounts({
        challenge: challengeAccount.publicKey,
        creator: wallet.publicKey,
        escrowAccount: new PublicKey("آدرس_کیف_پول_امن_سیستم"),
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([challengeAccount])
      .rpc();

    return { success: true, transactionId: tx };
  } catch (error) {
    console.error("بلاکچین با خطا مواجه شد:", error);
    return { success: false, error };
  }
};
