import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay, 
  withTiming 
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const CiblNotification = ({ visible, message, type = 'success', onClose }) => {
  const { theme } = useTheme();
  const translateY = useSharedValue(-100); // شروع از بیرون صفحه

  useEffect(() => {
    if (visible) {
      // لرزش هنگام ظاهر شدن اعلان
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // حرکت به داخل صفحه
      translateY.value = withSpring(50); 

      // محو شدن خودکار بعد از ۴ ثانیه
      const timer = setTimeout(() => {
        translateY.value = withTiming(-100, { duration: 500 }, () => {
          if (onClose) onClose();
        });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible && translateY.value === -100) return null;

  return (
    <Animated.View style={[
      styles.container, 
      animatedStyle, 
      { 
        backgroundColor: theme.card, 
        borderColor: type === 'success' ? theme.primary : '#ef4444',
        shadowColor: type === 'success' ? theme.primary : '#ef4444' 
      }
    ]}>
      <View style={styles.content}>
        <CiBLIcon 
          name={type === 'success' ? ICONS.SUCCESS : ICONS.ERROR} 
          size={20} 
          color={type === 'success' ? theme.primary : '#ef4444'} 
        />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text }]}>
            {type === 'success' ? 'SYSTEM_ALERT' : 'SECURITY_BREACH'}
          </Text>
          <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text>
        </View>
      </View>
      {/* خط پیشرفت زمان در پایین اعلان */}
      <View style={[styles.progressBar, { backgroundColor: theme.primary, opacity: 0.3 }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: width - 40,
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    zIndex: 9999,
    elevation: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  content: { flexDirection: 'row', alignItems: 'center' },
  textContainer: { marginLeft: 15 },
  title: { fontFamily: 'Orbitron-Bold', fontSize: 10, letterSpacing: 1 },
  message: { fontFamily: 'Cairo-Bold', fontSize: 13, marginTop: 2 },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    width: '100%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  }
});

export default CiblNotification;
