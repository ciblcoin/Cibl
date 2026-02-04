import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { mnemonicToSeedSync } from 'bip39';

export const SuiModule = {
  // ۱. تولید آدرس SUI از روی Seed Phrase اصلی
  async deriveAddress(mnemonic) {
    const seed = mnemonicToSeedSync(mnemonic);
    // استفاده از مسیر مشتق‌سازی استاندارد SUI (m/44'/784'/0'/0'/0')
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic, `m/44'/784'/0'/0'/0'`);
    return {
      address: keypair.getPublicKey().toSuiAddress(),
      keypair: keypair
    };
  },

  // ۲. دریافت موجودی SUI
  async getBalance(address) {
    const client = new SuiClient({ url: getFullnodeUrl('mainnet') });
    const coins = await client.getCoins({ owner: address });
    return coins.data.reduce((total, coin) => total + Number(coin.balance), 0) / 1e9;
  }
};
