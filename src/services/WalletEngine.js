import "./shim"; // حتماً بفر بر را ابتدا لود کنید
import * as bip39 from 'bip39';
import { Buffer } from 'buffer';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { ethers } from 'ethers';
import * as bitcoin from 'bitcoinjs-lib';

class WalletEngine {
  /**
   * گام ۱: تولید ۱۲ کلمه بازیابی کاملاً تصادفی
   */
  static generateMnemonic() {
    return bip39.generateMnemonic(); // استاندارد BIP39
  }

  /**
   * گام ۲: استخراج تمام کیف پول‌ها از یک عبارت واحد
   */
  static async createMultiChainWallet(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const seedHex = seed.toString('hex');

    return {
      // ۱. کیف پول سولانا (Derivation Path: m/44'/501'/0'/0')
      solana: this.deriveSolana(seedHex),
      
      // ۲. کیف پول اتریوم و زنجیره‌های EVM (m/44'/60'/0'/0/0)
      evm: this.deriveEVM(mnemonic),
      
      // ۳. کیف پول بیت‌کوین (m/84'/0'/0'/0/0 - SegWit)
      bitcoin: this.deriveBitcoin(seed),
    };
  }

  static deriveSolana(seedHex) {
    const path = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(path, seedHex).key;
    const keypair = Keypair.fromSeed(derivedSeed);
    return {
      address: keypair.publicKey.toBase58(),
      privateKey: Buffer.from(keypair.secretKey).toString('hex')
    };
  }

  static deriveEVM(mnemonic) {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey
    };
  }

  static deriveBitcoin(seed) {
    const network = bitcoin.networks.bitcoin; // شبکه اصلی
    const root = bitcoin.bip32.fromSeed(seed, network);
    const child = root.derivePath("m/84'/0'/0'/0/0"); // Native SegWit (bc1...)
    
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: child.publicKey,
      network: network,
    });

    return {
      address,
      privateKey: child.toWIF() // فرمت استاندارد برای ایمپورت در تراست‌ولت
    };
  }
}

export default WalletEngine;
