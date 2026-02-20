import * as SecureStore from 'expo-secure-store';

export const VaultService = {
  // ذخیره امن کلمات بازیابی
  saveSeedPhrase: async (mnemonic) => {
    const data = JSON.stringify(mnemonic);
    await SecureStore.setItemAsync('cibl_seed_phrase', data, {
      keychainAccessible: SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    });
  },

  // بازیابی کلمات (فقط بعد از تایید هویت صدا زده شود)
  getSeedPhrase: async () => {
    const result = await SecureStore.getItemAsync('cibl_seed_phrase');
    return result ? JSON.parse(result) : null;
  },

  // حذف اطلاعات (هنگام خروج از کیف پول)
  wipeVault: async () => {
    await SecureStore.deleteItemAsync('cibl_seed_phrase');
  }
};
