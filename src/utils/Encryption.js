import * as Crypto from 'expo-crypto';
import AesCrypto from 'react-native-aes-crypto'; // نیاز به نصب: npm install react-native-aes-crypto
import { ENCRYPTION_KEY } from '@env';

/**
 * CiBL Security Module
 * High-grade encryption for mnemonic and private keys
 */

class Encryption {
    // Generate a random IV (Initialization Vector)
    static generateIv = async () => {
        return await AesCrypto.randomKey(16);
    };

    /**
     * Encrypts plain text (Mnemonic/Private Key)
     * @param {string} text 
     */
    static encrypt = async (text) => {
        try {
            const iv = await this.generateIv();
            // Using AES-256-CBC for robust mobile storage
            const cipher = await AesCrypto.encrypt(text, ENCRYPTION_KEY, iv, 'aes-256-cbc');
            
            // We return both cipher and iv joined by a colon
            return `${iv}:${cipher}`;
        } catch (error) {
            console.error("Encryption failed:", error);
            throw new Error("SEC_ERR_01: Encryption Failed");
        }
    };

    /**
     * Decrypts the stored string
     * @param {string} encryptedData (Format: "iv:cipher")
     */
    static decrypt = async (encryptedData) => {
        try {
            const [iv, cipher] = encryptedData.split(':');
            const decryptedText = await AesCrypto.decrypt(cipher, ENCRYPTION_KEY, iv, 'aes-256-cbc');
            return decryptedText;
        } catch (error) {
            console.error("Decryption failed:", error);
            throw new Error("SEC_ERR_02: Decryption Failed. Check Secret Key.");
        }
    };
}

export default Encryption;

import Encryption from '../utils/Encryption';
import * as SecureStore from 'expo-secure-store';

const saveWalletSafely = async (mnemonic) => {
    // 1. رمزنگاری کلمات بازیابی
    const encryptedMnemonic = await Encryption.encrypt(mnemonic);
    
    // 2. ذخیره در بخش امن سیستم‌عامل (Keychain/Keystore)
    await SecureStore.setItemAsync('user_wallet', encryptedMnemonic);
    
    console.log("Wallet secured successfully.");
};
