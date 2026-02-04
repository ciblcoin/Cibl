import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./trading_challenge.json"; 

const programId = new PublicKey("آدرس_قرارداد_شما");

export const getProgram = (wallet) => {
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  
  // ایجاد یک Provider موقت با استفاده از کیف پول کاربر
  const provider = new anchor.AnchorProvider(
    connection, 
    wallet, 
    { preflightCommitment: "confirmed" }
  );
  
  // بازگرداندن شیء برنامه برای فراخوانی توابع Rust
  return new anchor.Program(idl, programId, provider);
};
