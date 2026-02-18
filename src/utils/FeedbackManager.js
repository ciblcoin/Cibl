import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

class FeedbackManager {
  static sounds = {};

  // بارگذاری اولیه صداها در حافظه (Pre-loading)
  static async loadAll() {
    const soundFiles = {
      'tap': require('../../assets/sounds/neon-tap.mp3'),
      'success': require('../../assets/sounds/success.mp3'),
      'error': require('../../assets/sounds/error.mp3'),
    };

    for (const [key, file] of Object.entries(soundFiles)) {
      const { sound } = await Audio.Sound.createAsync(file);
      this.sounds[key] = sound;
    }
  }

  // پخش صدا همراه با لرزش ملایم
  static async playTap() {
    try {
      // ۱. لرزش سبک (مناسب برای دکمه‌های معمولی)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      // ۲. پخش صدا
      if (this.sounds['tap']) {
        await this.sounds['tap'].replayAsync();
      }
    } catch (e) {
      console.log('Feedback Error:', e);
    }
  }

  // پخش صدای موفقیت (مثلاً بعد از تراکنش)
  static async playSuccess() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (this.sounds['success']) {
      await this.sounds['success'].replayAsync();
    }
  }
}

export default FeedbackManager;
import FeedbackManager from '../utils/FeedbackManager';

const NeonButton = ({ title, onPress }) => {
  const handlePress = () => {
    FeedbackManager.playTap(); // اجرای جادوی صدا و لرزش
    onPress();
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      className="bg-cyan-500/20 border border-cyan-500 p-4 rounded-2xl shadow-lg shadow-cyan-500/50"
    >
      <Text className="text-cyan-400 font-black text-center">{title}</Text>
    </TouchableOpacity>
  );
};
