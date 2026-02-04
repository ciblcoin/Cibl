import SolanaWallet from './solana/wallet';
import EVMWallet from './evm/wallet';
import TonWallet from './ton/wallet';
import { supabase } from '../api/supabaseClient';

class MultiChainManager {
    /**
     * تولید تمام آدرس‌ها از یک عبارت بازیابی واحد
     * @param {string} mnemonic - ۱۲ یا ۲۴ کلمه بازیابی
     */
    static async setupUserWallets(mnemonic) {
        try {
            // ۱. تولید کیف پول‌ها به صورت موازی
            const [solKeypair, evmWallet, tonData] = await Promise.all([
                SolanaWallet.createWalletFromMnemonic(mnemonic),
                EVMWallet.createWallet(mnemonic),
                TonWallet.createWallet(mnemonic)
            ]);

            const walletData = {
                solana_address: solKeypair.publicKey.toBase58(),
                evm_address: evmWallet.address,
                ton_address: tonData.address,
                created_at: new Date()
            };

            // ۲. ذخیره آدرس‌های عمومی در Supabase برای شناسایی کاربر در چت و چالش
            // نکته امنیتی: هرگز کلید خصوصی یا Mnemonic را به دیتابیس نفرستید!
            const { error } = await supabase
                .from('user_profiles')
                .upsert([
                    { 
                        id: (await supabase.auth.getUser()).data.user.id,
                        ...walletData
                    }
                ]);

            if (error) throw error;

            return walletData;
        } catch (error) {
            console.error("Critical error in wallet setup:", error);
            throw error;
        }
    }

    /**
     * دریافت موجودی کل از تمام زنجیره‌ها برای نمایش در صدر لیست
     */
    static async getAllBalances(addresses) {
        const balances = await Promise.allSettled([
            SolanaWallet.getBalance(addresses.solana_address),
            EVMWallet.getBalance(addresses.evm_address, 'https://polygon-rpc.com'), // مثال پلی‌گان
            TonWallet.getBalance(addresses.ton_address)
        ]);

        return {
            solana: balances[0].status === 'fulfilled' ? balances[0].value : 0,
            evm: balances[1].status === 'fulfilled' ? balances[1].value : 0,
            ton: balances[2].status === 'fulfilled' ? balances[2].value : 0,
        };
    }
}

export default MultiChainManager;
