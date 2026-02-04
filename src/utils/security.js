import * as Keychain from 'react-native-keychain';
import AES from 'crypto-js/aes';

export const saveSecurely = async (mnemonic, password) => {
    try {
        // ۱. رمزنگاری کلمات با پسورد کاربر
        const encryptedMnemonic = AES.encrypt(mnemonic, password).toString();

        // ۲. ذخیره در حافظه امن سخت‌افزاری
        await Keychain.setGenericPassword('user_mnemonic', encryptedMnemonic, {
            service: 'cibl_wallet_secure_storage',
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY, // اجازه دسترسی فقط با اثر انگشت/FaceID
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });
        return true;
    } catch (error) {
        console.error("Storage error:", error);
        return false;
    }
};
