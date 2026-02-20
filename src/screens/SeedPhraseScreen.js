import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence 
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { InteractionService } from '../utils/InteractionService';
import { CiBLIcon, ICONS } from '../utils/Icons';

const SeedPhraseScreen = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  // دیتای تستی (در پروژه واقعی از SecureStore خوانده می‌شود)
  const seedPhrase = ["neon", "bridge", "crypto", "quantum", "layer", "secure", "alpha", "void", "binary", "matrix", "cyber", "node"];

  const progress = useSharedValue(0);

  // انیمیشن لرزش هنگام نگه داشتن دکمه
  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value > 0 && progress.value < 1 ? withRepeat(withSequence(withTiming(-2, {duration: 50}), withTiming(2, {duration: 50})), 5) : 0 }]
    };
  });

  const handlePressIn = () => {
    progress.value = withTiming(1, { duration: 2000 }, (finished) => {
      if (finished) {
        // اجرای لرزش سنگین در لحظه ظهور
        setIsVisible(true);
      }
    });
  };

  const handlePressOut = () => {
    if (!isVisible) {
      progress.value = withTiming(0);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.warningBox}>
        <CiBLIcon name={ICONS.SECURITY} size={40} color="#ff4444" />
        <Text style={[styles.warningText, { color: theme.text }]}>
          DO NOT SHARE YOUR SEED PHRASE WITH ANYONE. IT PROVIDES FULL ACCESS TO YOUR ASSETS.
        </Text>
      </View>

      <View style={styles.grid}>
        {seedPhrase.map((word, index) => (
          <View key={index} style={[styles.wordCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={styles.indexText}>{index + 1}</Text>
            <Text style={[styles.wordText, { color: isVisible ? theme.primary : 'transparent' }]}>
              {isVisible ? word : '•••••'}
            </Text>
            {!isVisible && <View style={[styles.blurDot, { backgroundColor: theme.textMuted }]} />}
          </View>
        ))}
      </View>

      <Animated.View style={[styles.revealContainer, shakeStyle]}>
        {!isVisible ? (
          <Pressable 
            onPressIn={handlePressIn} 
            onPressOut={handlePressOut}
            style={({ pressed }) => [
              styles.revealBtn, 
              { borderColor: theme.primary, backgroundColor: pressed ? theme.primary + '33' : 'transparent' }
            ]}
          >
            <Text style={[styles.revealBtnText, { color: theme.primary }]}>HOLD TO REVEAL (2s)</Text>
          </Pressable>
        ) : (
          <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.hideBtn}>
            <Text style={{ color: theme.textMuted, fontFamily: 'Orbitron-Bold' }}>HIDE AGAIN</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center' },
  warningBox: { alignItems: 'center', marginBottom: 40 },
  warningText: { textAlign: 'center', fontFamily: 'Cairo-Bold', marginTop: 15, fontSize: 13, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  wordCard: { 
    width: '31%', 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    marginBottom: 15, 
    alignItems: 'center',
    height: 50,
    justifyContent: 'center'
  },
  indexText: { position: 'absolute', top: 2, left: 4, fontSize: 8, color: '#64748B' },
  wordText: { fontFamily: 'Courier', fontSize: 14, fontWeight: 'bold' },
  blurDot: { width: 30, height: 4, borderRadius: 2 },
  revealContainer: { marginTop: 40 },
  revealBtn: { 
    height: 60, 
    borderWidth: 2, 
    borderRadius: 15, 
    borderStyle: 'dashed', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  revealBtnText: { fontFamily: 'Orbitron-Bold', letterSpacing: 2 },
  hideBtn: { alignSelf: 'center', padding: 20 }
});

export default SeedPhraseScreen;





import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SecurityService } from '../utils/SecurityService'; // سرویس امنیتی ما
import CiblButton from '../components/CiblButton';
import { CiBLIcon, ICONS } from '../utils/Icons';

const SeedPhraseScreen = () => {
  const { theme } = useTheme();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const seedPhrase = ["neon", "bridge", "crypto", "quantum", "layer", "secure", "alpha", "void", "binary", "matrix", "cyber", "node"];

  const handleSecurityCheck = async () => {
    // ۱. فراخوانی FaceID یا اثر انگشت
    const success = await SecurityService.authenticate(theme);
    
    if (success) {
      setIsUnlocked(true);
    } else {
      Alert.alert("SECURITY_ALERT", "IDENTITY VERIFICATION FAILED. ACCESS DENIED.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <CiBLIcon name={ICONS.KEYS} size={50} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>RECOVERY_VAULT</Text>
      </View>

      {!isUnlocked ? (
        // حالت قفل: کاربر باید ابتدا هویت خود را تایید کند
        <View style={styles.lockedContainer}>
          <Text style={[styles.lockDesc, { color: theme.textMuted }]}>
            THE SEED PHRASE IS ENCRYPTED. PROVIDE BIO-SIGNATURE TO DECRYPT.
          </Text>
          <CiblButton 
            title="AUTHENTICATE" 
            onPress={handleSecurityCheck} 
          />
        </View>
      ) : (
        // حالت باز: کلمات نمایش داده می‌شوند (با همان استایل قبلی)
        <View style={styles.grid}>
          {seedPhrase.map((word, index) => (
            <View key={index} style={[styles.wordCard, { backgroundColor: theme.card, borderColor: theme.primary }]}>
              <Text style={styles.indexText}>{index + 1}</Text>
              <Text style={[styles.wordText, { color: theme.text }]}>{word}</Text>
            </View>
          ))}
          <Text style={[styles.warningText, { color: '#ff4444' }]}>
            WRITE THESE DOWN OFFLINE. NEVER TAKE A SCREENSHOT.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 50 },
  title: { fontFamily: 'Orbitron-Bold', fontSize: 18, marginTop: 15, letterSpacing: 3 },
  lockedContainer: { alignItems: 'center' },
  lockDesc: { fontFamily: 'Courier', textAlign: 'center', marginBottom: 30, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  wordCard: { width: '31%', padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 15, alignItems: 'center' },
  indexText: { position: 'absolute', top: 2, left: 4, fontSize: 8, color: '#64748B' },
  wordText: { fontFamily: 'Courier', fontSize: 14, fontWeight: 'bold' },
  warningText: { fontFamily: 'Orbitron-Bold', fontSize: 9, textAlign: 'center', width: '100%', marginTop: 20 }
});

export default SeedPhraseScreen;

