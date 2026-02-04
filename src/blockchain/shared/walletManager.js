import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { AES, enc } from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Storage encryption key from .env

export const WalletManager = {
  /**
   * Securely saves the mnemonic/private key after encryption
   */
  async saveSecurely(key, value) {
    try {
      const encryptedValue = AES.encrypt(value, ENCRYPTION_KEY).toString();
      await SecureStore.setItemAsync(key, encryptedValue);
      return true;
    } catch (error) {
      console.error("Storage Error:", error);
      return false;
    }
  },

  /**
   * Retrieves and decrypts the key only after Biometric Auth
   */
  async getSecretWithAuth(key) {
    try {
      // 1. Request Biometric Authentication
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirm Identity to Access Wallet',
        fallbackLabel: 'Enter PIN',
      });

      if (!auth.success) return null;

      // 2. Fetch from Secure Storage
      const encryptedValue = await SecureStore.getItemAsync(key);
      if (!encryptedValue) return null;

      // 3. Decrypt data
      const bytes = AES.decrypt(encryptedValue, ENCRYPTION_KEY);
      return bytes.toString(enc.Utf8);
    } catch (error) {
      console.error("Decryption Error:", error);
      return null;
    }
  },

  /**
   * Signs a transaction for a specific chain
   */
  async signTransaction(transaction, chain) {
    const privateKey = await this.getSecretWithAuth(`${chain}_private_key`);
    if (!privateKey) throw new Error("Authentication failed");

    // Logic to sign based on chain (Solana, EVM, etc.)
    // return signedTx;
    console.log(`Signing transaction for ${chain}...`);
  }
};
