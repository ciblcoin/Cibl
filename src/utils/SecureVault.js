// src/utils/SecureVault.js
import * as SecureStore from 'expo-secure-store';

export const saveMnemonicSecurely = async (mnemonic) => {
  try {
    await SecureStore.setItemAsync('user_seed', mnemonic, {
      keychainAccessible: SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    });
  } catch (e) {
    console.error("Vault Error:", e);
  }
};
