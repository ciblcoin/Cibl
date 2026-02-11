import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Buffer } from 'buffer';

// تنظیمات شبکه (این آدرس را بعداً با پروکسی Cloudflare جایگزین کنید)
const RPC_URL = "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL, 'confirmed');

class SolanaWallet {
    /**
     * تولید کیف پول از عبارت بازیابی (Mnemonic)
     * @param {string} mnemonic 
     */
    static async createWalletFromMnemonic(mnemonic) {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const seedBuffer = Buffer.from(seed).toString('hex');
        
        // مسیر استاندارد سولانا (Derivation Path)
        const path = "m/44'/501'/0'/0'";
        const derivedKey = derivePath(path, seedBuffer).key;
        
        const keypair = Keypair.fromSeed(derivedKey);
        return keypair;
    }

    /**
     * دریافت موجودی SOL
     * @param {string} publicKeyString 
     */
    static async getBalance(publicKeyString) {
        try {
            const pubKey = new PublicKey(publicKeyString);
            const balance = await connection.getBalance(pubKey);
            return balance / LAMPORTS_PER_SOL;
        } catch (error) {
            console.error("Error fetching balance:", error);
            return 0;
        }
    }

    /**
     * دریافت موجودی توکن‌های SPL (مثل USDC)
     * برای بخش چالش ۵ دلاری کاربرد دارد
     */
    static async getTokenBalance(walletAddress, tokenMintAddress) {
        try {
            const response = await connection.getParsedTokenAccountsByOwner(
                new PublicKey(walletAddress),
                { mint: new PublicKey(tokenMintAddress) }
            );
            
            if (response.value.length > 0) {
                return response.value[0].account.data.parsed.info.tokenAmount.uiAmount;
            }
            return 0;
        } catch (error) {
            return 0;
        }
    }
}

export default SolanaWallet;
