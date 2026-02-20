import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  withDelay,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon } from '../utils/Icons';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const { theme } = useTheme();
  
  // مقادیر انیمیشن
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    // ۱. انیمیشن ورود (Fade In & Scale)
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
    scale.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.back(2)) });

    // ۲. ایجاد افکت چشمک‌زن نئونی (Flicker) بعد از لود شدن
    glowOpacity.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(0.4, { duration: 50 }),
        withTiming(0.8, { duration: 150 }),
        withTiming(0.2, { duration: 80 }),
        withTiming(1, { duration: 200 }),
      ), 
      -1, // تکرار بی‌پایان تا زمان پایان لودینگ
      true
    ));

    // ۳. شبیه‌سازی زمان لودینگ دیتای کیف‌پول و انتقال به داشبورد
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 800 }, () => {
        runOnJS(onFinish)(); // انتقال به صفحه اصلی
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    shadowOpacity: glowOpacity.value,
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View style={[styles.logoWrapper, animatedLogoStyle, glowStyle, { shadowColor: theme.primary }]}>
        <CiBLIcon name="Zap" size={100} color={theme.primary} strokeWidth={1.5} />
        <Animated.Text style={[styles.title, { color: theme.text }]}>CiBL</Animated.Text>
        <Animated.Text style={[styles.subtitle, { color: theme.textMuted }]}>SECURE NEURAL LINK</Animated.Text>
      </Animated.View>
      
      {/* خطوط اسکن در پس‌زمینه (افکت ماتریکس‌گونه) */}
      <View style={[styles.scanLine, { backgroundColor: theme.primary + '10' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoWrapper: {
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 20,
  },
  title: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 42,
    letterSpacing: 8,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 10,
    letterSpacing: 4,
    marginTop: 5,
  },
  scanLine: {
    position: 'absolute',
    width: width,
    height: 2,
    top: '50%',
    opacity: 0.3,
  }
});

export default SplashScreen;
