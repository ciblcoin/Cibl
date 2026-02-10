// src/services/SecurityEngine.js
import * as SecureStore from 'expo-secure-store';

const MAX_ATTEMPTS = 5;

export const handleFailedLogin = async (currentAttempts) => {
  const newAttempts = currentAttempts + 1;
  
  if (newAttempts >= MAX_ATTEMPTS) {
    // 🔥 اجرای پروتکل تخریب خودکار
    await SecureStore.deleteItemAsync('user_private_key');
    await SecureStore.deleteItemAsync('user_seed_phrase');
    
    // پخش صدای آژیر قرمز و لرزش شدید
    SoundManager.playEffect('ALARM_CRITICAL');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    
    return 'DESTROYED';
  }
  return newAttempts;
};
