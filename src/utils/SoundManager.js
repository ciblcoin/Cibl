import { Audio } from 'expo-av';

const SOUND_FILES = {
  TX_SUCCESS: require('../../assets/sounds/tx_success.mp3'),
  TX_FAILED: require('../../assets/sounds/tx_failed.mp3'),
  TX_FLYOUT: require('../../assets/sounds/tx_flyout.mp3'),
  TX_CHARGE: require('../../assets/sounds/tx_charge.mp3'),
  NEON_TICK: require('../../assets/sounds/neon_tick.mp3'),
  NAV_SWOOSH: require('../../assets/sounds/nav_swoosh.mp3'),
  SCAN_BEEP: require('../../assets/sounds/scan_beep.mp3'),
  REFRESH: require('../../assets/sounds/refresh_glitch.mp3'),
  AUTH: require('../../assets/sounds/auth_pass.mp3'),
  ALARM: require('../../assets/sounds/alarm_critical.mp3'),
  NOTIFY: require('../../assets/sounds/notification_pop.mp3'),
  SWORD: require('../../assets/sounds/sword_clash.mp3'),
  WIN: require('../../assets/sounds/duel_win.mp3'),
  LOSS: require('../../assets/sounds/duel_loss.mp3'),
  MSG: require('../../assets/sounds/msg_send.mp3'),
};

class SoundManager {
  static instance = null;
  sounds = {};
  isEnabled = true; // امکان غیرفعال کردن از تنظیمات

  async init() {
    // بارگذاری اولیه تمام صداها برای جلوگیری از تاخیر
    for (const [key, file] of Object.entries(SOUND_FILES)) {
      const { sound } = await Audio.Sound.createAsync(file);
      this.sounds[key] = sound;
    }
  }

  async play(soundKey) {
    if (!this.isEnabled || !this.sounds[soundKey]) return;

    try {
      // بازنشانی صدا به ابتدا و پخش
      await this.sounds[soundKey].stopAsync();
      await this.sounds[soundKey].playAsync();
    } catch (error) {
      console.log("Sound play error:", error);
    }
  }

  setMute(isMuted) {
    this.isEnabled = !isMuted;
  }
}

export default new SoundManager();
