import { ethers } from 'ethers';
import * as bip39 from 'bip39';

class EVMWallet {
    // مسیر استاندارد اتریوم
    static PATH = "m/44'/60'/0'/0/0";

    static async createWallet(mnemonic) {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const hdNode = ethers.utils.HDNode.fromSeed(seed);
        const childNode = hdNode.derivePath(this.PATH);
        return new ethers.Wallet(childNode.privateKey);
    }

    static async getBalance(address, rpcUrl) {
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const balance = await provider.getBalance(address);
        return ethers.utils.formatEther(balance);
    }
}
export default EVMWallet;
