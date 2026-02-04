import * as bip39 from 'bip39';
import SolanaWallet from './solana/wallet';
import EVMWallet from './evm/wallet';
import TonWallet from './ton/wallet';

export const generateMasterWallet = async (existingMnemonic = null) => {
    const mnemonic = existingMnemonic || bip39.generateMnemonic();
    
    // تولید همزمان تمام آدرس‌ها
    const [solana, evm, ton] = await Promise.all([
        SolanaWallet.createWalletFromMnemonic(mnemonic),
        EVMWallet.createWallet(mnemonic),
        TonWallet.createWallet(mnemonic)
    ]);

    return {
        mnemonic,
        addresses: {
            solana: solana.publicKey.toBase58(),
            evm: evm.address,
            ton: ton.address
        },
        privateKeys: {
            solana: solana.secretKey,
            evm: evm.privateKey,
            ton: ton.key.secretKey
        }
    };
};
