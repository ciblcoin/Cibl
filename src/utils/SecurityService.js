import * as SecureStore from 'expo-secure-store';

const VAULT_KEYS = {
  MNEMONIC: 'cibl_seed_phrase',
  PRIVATE_KEY: 'cibl_private_key',
  WALLET_ADDRESS: 'cibl_address',
};

class SecurityService {
  // ۱. ذخیره امن داده‌ها
  static async saveWallet(mnemonic, privateKey, address) {
    try {
      await SecureStore.setItemAsync(VAULT_KEYS.MNEMONIC, mnemonic);
      await SecureStore.setItemAsync(VAULT_KEYS.PRIVATE_KEY, privateKey);
      await SecureStore.setItemAsync(VAULT_KEYS.WALLET_ADDRESS, address);
      return true;
    } catch (e) {
      console.error("Vault Save Error:", e);
      return false;
    }
  }

  // ۲. بازیابی آدرس عمومی (برای نمایش در UI)
  static async getAddress() {
    return await SecureStore.getItemAsync(VAULT_KEYS.WALLET_ADDRESS);
  }

  // ۳. دریافت کلید خصوصی (فقط موقع امضای تراکنش)
  static async getPrivateKey() {
    return await SecureStore.getItemAsync(VAULT_KEYS.PRIVATE_KEY);
  }

  // ۴. چک کردن اینکه آیا کاربر قبلاً کیف‌پول ساخته یا نه
  static async hasWallet() {
    const address = await this.getAddress();
    return address !== null;
  }

  // ۵. پاک کردن کامل اطلاعات (موقع خروج یا حذف اکانت)
  static async wipeVault() {
    await SecureStore.deleteItemAsync(VAULT_KEYS.MNEMONIC);
    await SecureStore.deleteItemAsync(VAULT_KEYS.PRIVATE_KEY);
    await SecureStore.deleteItemAsync(VAULT_KEYS.WALLET_ADDRESS);
  }
}

export default SecurityService;


const handleFinalizeWallet = async (walletData) => {
  const isSaved = await SecurityService.saveWallet(
    walletData.phrase,
    walletData.privateKey,
    walletData.address
  );

  if (isSaved) {
    // هدایت کاربر به داشبورد اصلی
    navigation.replace('MainTabs');
  } else {
    alert("Security Vault Error. Please try again.");
  }
};
