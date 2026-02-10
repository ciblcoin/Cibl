// src/services/UniversalTxService.js

import { handleSolanaTx } from './networks/solana';
import { handleEvmTx } from './networks/evm'; // برای اتریوم، پالیگان، بایننس و...
import { handleBitcoinTx } from './networks/bitcoin';
import SoundManager from '../utils/SoundManager';
import * as Haptics from 'expo-haptics';

export const executeUniversalTx = async (txDetails) => {
  const { network, type, amount, symbol } = txDetails;
  
  try {
    let result;
    // تشخیص شبکه و اجرای تراکنش مخصوص آن
    switch (network) {
      case 'SOLANA': result = await handleSolanaTx(txDetails); break;
      case 'EVM':    result = await handleEvmTx(txDetails); break;
      case 'BTC':    result = await handleBitcoinTx(txDetails); break;
      case 'SUI':    result = await handleSuiTx(txDetails); break;
      default: throw new Error("Network not supported yet");
    }

    if (result.success) {
      // ✅ خروجی یکسان برای تمام بلاک‌چین‌ها
      triggerSuccessFeedback(amount, symbol);
      return result;
    }
  } catch (error) {
    // ❌ خطای یکسان برای تمام بلاک‌چین‌ها
    triggerErrorFeedback(error.message);
  }
};

const triggerSuccessFeedback = (amount, symbol) => {
  SoundManager.playEffect('TX_SUCCESS'); // همان صدای جرینگ نئونی
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  // نمایش رسید سبز نئونی (SuccessReceipt)
};

const triggerErrorFeedback = (message) => {
  SoundManager.playEffect('TX_FAILED'); // همان صدای Thud سنگین
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  // نمایش رسید قرمز نئونی (ErrorReceipt)
};
import * as LocalAuthentication from 'expo-local-authentication';

export const confirmIdentity = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return true; // اگر گوشی قدیمی بود

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Confirm Transaction',
    fallbackLabel: 'Enter Passcode',
  });

  return result.success;
};
