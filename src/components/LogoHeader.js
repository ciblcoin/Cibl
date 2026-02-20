import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { InteractionService } from '../utils/InteractionService';
import { CiBLIcon, ICONS } from '../utils/Icons';
import * as Haptics from 'expo-haptics'; // برای لرزش‌های سیستمی

const LogoHeader = ({ onUnlockMatrix }) => {
  const { theme } = useTheme();
  const [tapCount, setTapCount] = useState(0);
  const timerRef = useRef(null);

  const handlePress = async () => {
    // پاک کردن تایمر قبلی در صورت وجود
    if (timerRef.current) clearTimeout(timerRef.current);

    const newCount = tapCount + 1;

    if (newCount === 5) {
      setTapCount(0);
      
      // ۱. اجرای افکت صوتی و لرزش قوی برای تایید موفقیت
      await InteractionService.playInteraction(theme);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // ۲. فعال کردن حالت ماتریکس یا تم مخفی
      if (onUnlockMatrix) onUnlockMatrix();
      
      console.log("MATRIX_UNLOCKED: System breach successful.");
    } else {
      setTapCount(newCount);
      
      // ۳. لرزش خفیف با هر ضربه برای فیدبک به کاربر
      Haptics.selectionAsync();

      // ۴. ریست کردن شمارنده اگر کاربر بیش از ۲ ثانیه مکث کرد
      timerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 2000);
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      activeOpacity={0.8}
      style={styles.container}
    >
      {/* استفاده از آیکون لوگوی CiBL که قبلاً طراحی کردیم */}
      <CiBLIcon 
        name="Zap" // یا هر آیکونی که به عنوان لوگو در ICONS تعریف کردیم
        size={40} 
        color={theme.primary} 
        strokeWidth={2.5}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LogoHeader;


const LogoHeader = () => {
  const { unlockMatrix, toggleTheme } = useTheme();

  const handleSecretTrigger = () => {
    unlockMatrix(); // باز کردن قفل دائمی
    toggleTheme('matrix'); // سوییچ آنی به تم ماتریکس
  };

  // ... همان منطق ۵ کلیک قبلی که handleSecretTrigger را صدا می‌زند
};
