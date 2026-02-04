import { mnemonicToPrivateKey } from "@ton/crypto";
import { WalletContractV4, TonClient, fromNano } from "@ton/ton";

class TonWallet {
    static async createWallet(mnemonic) {
        const mnemonicArray = mnemonic.split(' ');
        const key = await mnemonicToPrivateKey(mnemonicArray);
        
        // استفاده از Wallet V4 R2 که استاندارد فعلی اکثر کیف پول‌هاست
        const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
        const address = wallet.address.toString({ bounceable: false });
        
        return { wallet, address, key };
    }

    static async getBalance(address) {
        const client = new TonClient({
            endpoint: 'https://toncenter.com/api/v2/jsonRPC',
            apiKey: 'YOUR_TONCENTER_API_KEY' // دریافت رایگان از @toncenter_bot
        });
        const balance = await client.getBalance(address);
        return fromNano(balance);
    }
}
export default TonWallet;
