import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  runOnJS 
} from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const KeyGenerationScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState('INITIALIZING_ALGORITHM...');
  const opacity = useSharedValue(0);

  // تولید هگزادسیمال‌های تصادفی برای نمایش در پس‌زمینه
  const generateRandomHex = () => Math.random().toString(16).slice(2, 10).toUpperCase();

  useEffect(() => {
    opacity.value = withRepeat(withSequence(withTiming(1, { duration: 500 }), withTiming(0.3, { duration: 500 })), -1, true);

    const steps = [
      { text: 'COLLECTING_ENTROPY...', delay: 1000 },
      { text: 'GENERATING_PRIVATE_KEY...', delay: 2500 },
      { text: 'ENCRYPTING_VAULT...', delay: 4000 },
      { text: 'INJECTING_SEED_PHRASE...', delay: 5500 },
      { text: 'SUCCESS_KEY_GENERATED', delay: 7000 },
    ];

    steps.forEach(step => {
      setTimeout(() => setCurrentStep(step.text), step.delay);
    });

    // انتقال به صفحه نمایش کلمات بعد از اتمام فرآیند
    setTimeout(() => {
      navigation.replace('CreateWallet');
    }, 8000);
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* افکت نوری در مرکز */}
      <View style={[styles.glow, { shadowColor: theme.primary }]} />
      
      <View style={styles.terminalContainer}>
        <Text style={[styles.hexText, { color: theme.primary + '33' }]}>
          {Array(10).fill(0).map(() => `${generateHex()} ${generateHex()} `).join('\n')}
        </Text>
        
        <Animated.View style={[styles.statusBox, animatedTextStyle]}>
          <Text style={[styles.statusTitle, { color: theme.primary }]}>[SYSTEM_LOG]</Text>
          <Text style={[styles.statusMessage, { color: theme.text }]}>{currentStep}</Text>
        </Animated.View>

        <Text style={[styles.hexText, { color: theme.primary + '33' }]}>
          {Array(10).fill(0).map(() => `${generateHex()} ${generateHex()} `).join('\n')}
        </Text>
      </View>
    </View>
  );
};

const generateHex = () => Math.random().toString(16).slice(2, 8).toUpperCase();

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glow: { position: 'absolute', width: 100, height: 100, backgroundColor: 'transparent', shadowOpacity: 1, shadowRadius: 100, elevation: 20 },
  terminalContainer: { width: '100%', paddingHorizontal: 20 },
  hexText: { fontFamily: 'Courier', fontSize: 12, textAlign: 'center', lineHeight: 24, opacity: 0.2 },
  statusBox: { marginVertical: 40, alignItems: 'center', borderWidth: 1, padding: 20, borderRadius: 2, borderColor: 'rgba(255,255,255,0.1)' },
  statusTitle: { fontFamily: 'Orbitron-Bold', fontSize: 10, letterSpacing: 2, marginBottom: 10 },
  statusMessage: { fontFamily: 'Courier', fontSize: 14, fontWeight: 'bold' }
});

export default KeyGenerationScreen;
