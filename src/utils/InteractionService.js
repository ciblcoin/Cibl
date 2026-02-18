import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export const InteractionService = {
  playInteraction: async (theme) => {
    // Execute Haptic
    if (theme.hapticType) {
      Haptics.impactAsync(theme.hapticType);
    }

    // Play Sound
    try {
      const { sound } = await Audio.Sound.createAsync(theme.sound);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Audio Feedback Error:", error);
    }
  }
};
