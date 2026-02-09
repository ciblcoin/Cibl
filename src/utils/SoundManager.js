import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

const SOUND_ASSETS = {
  WIN: require('../../assets/sounds/win_coins.mp3'),
  LOSS: require('../../assets/sounds/loss_thud.mp3'),
  HEARTBEAT: require('../../assets/sounds/heartbeat_fast.mp3'),
  SWIPE: require('../../assets/sounds/neon_swipe.mp3'),
  CHALLENGE_START: require('../../assets/sounds/glitch_start.mp3'),
  BG_MUSIC: require('../../assets/sounds/cyberpunk_bg.mp3'),
};

class SoundManager {
  static bgSoundInstance = null;

  /**
   * پخش موسیقی پس‌زمینه به صورت لوپ (Loop)
   */
  static async startBackgroundMusic() {
    try {
      if (this.bgSoundInstance) return; // جلوگیری از پخش چندباره

      const { sound } = await Audio.Sound.createAsync(
        SOUND_ASSETS.BG_MUSIC,
        { isLooping: true, volume: 0.3, shouldPlay: true }
      );
      this.bgSoundInstance = sound;
    } catch (error) {
      console.error("BG Music Load Error:", error);
    }
  }

  /**
   * توقف موسیقی پس‌زمینه
   */
  static async stopBackgroundMusic() {
    if (this.bgSoundInstance) {
      await this.bgSoundInstance.stopAsync();
      await this.bgSoundInstance.unloadAsync();
      this.bgSoundInstance = null;
    }
  }

  /**
   * پخش افکت صوتی به همراه هپتیک (لرزش) مناسب
   * @param {string} soundKey - کلید صدا از SOUND_ASSETS
   */
  static async playEffect(soundKey) {
    try {
      // ۱. مدیریت لرزش (Haptics) بر اساس نوع اتفاق
      this.triggerHaptic(soundKey);

      // ۲. پخش صدا
      const { sound } = await Audio.Sound.createAsync(SOUND_ASSETS[soundKey]);
      await sound.playAsync();

      // آزاد کردن حافظه پس از اتمام صدا
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Effect Play Error:", error);
    }
  }

  /**
   * مدیریت هوشمند لرزش گوشی
   */
  static triggerHaptic(soundKey) {
    switch (soundKey) {
      case 'WIN':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'LOSS':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case 'SWIPE':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'CHALLENGE_START':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'HEARTBEAT':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      default:
        break;
    }
  }
}

export default SoundManager;
