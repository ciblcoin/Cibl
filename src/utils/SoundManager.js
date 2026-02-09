import { Audio } from 'expo-av';

import * as Haptics from 'expo-haptics';

// زمان برنده شدن
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// زمان اسکرول بین توکن‌ها
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

const sounds = {
  WIN: require('../../assets/sounds/win_coins.mp3'),
  LOSS: require('../../assets/sounds/loss_thud.mp3'),
  HEARTBEAT: require('../../assets/sounds/heartbeat_fast.mp3'),
  SWIPE: require('../../assets/sounds/neon_swipe.mp3'),
  CHALLENGE_START: require('../../assets/sounds/glitch_start.mp3'),
};

const [bgMusic, setBgMusic] = useState(null);

useEffect(() => {
  async function loadBgMusic() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/cyberpunk_bg.mp3'),
      { isLooping: true, volume: 0.3 }
    );
    setBgMusic(sound);
    await sound.playAsync();
  }
  loadBgMusic();

  return () => bgMusic?.unloadAsync();
}, []);

class SoundManager {
  static async playSound(soundKey) {
    try {
      const { sound } = await Audio.Sound.createAsync(sounds[soundKey]);
      await sound.playAsync();
      
      // آزاد کردن حافظه بعد از اتمام صدا
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Sound play error:", error);
    }
  }
}

export default SoundManager;


