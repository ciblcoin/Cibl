import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence, 
  Easing 
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const MatrixRain = () => {
  const { theme } = useTheme();
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    // فقط در تم ماتریکس فعال شود
    if (theme.id !== 'matrix') return;

    const numColumns = Math.floor(width / 20); // عرض هر ستون ۲۰ پیکسل
    const newColumns = Array.from({ length: numColumns }).map((_, colIndex) => {
      // برای هر ستون یک تاخیر تصادفی ایجاد می‌کنیم
      const startDelay = Math.random() * 2000;
      return { id: colIndex, startDelay };
    });
    setColumns(newColumns);
  }, [theme.id]); // وابسته به تغییر تم

  if (theme.id !== 'matrix') return null; // اگر تم ماتریکس نیست، چیزی نمایش نده

  return (
    <View style={styles.rainContainer}>
      {columns.map(col => (
        <RainColumn key={col.id} startDelay={col.startDelay} color={theme.primary} />
      ))}
    </View>
  );
};

const RainColumn = ({ startDelay, color }) => {
  const translateY = useSharedValue(-height);
  const opacity = useSharedValue(0.1);

  useEffect(() => {
    translateY.value = withDelay(startDelay, withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }), // شروع از بالا
        withTiming(height * 2, { duration: 8000 + Math.random() * 5000, easing: Easing.linear }) // ریزش
      ),
      -1, // تکرار بی‌پایان
      true // معکوس کردن در پایان هر سیکل
    ));

    opacity.value = withDelay(startDelay, withRepeat(
      withSequence(
        withTiming(0.1, { duration: 0 }),
        withTiming(0.4 + Math.random() * 0.3, { duration: 4000 + Math.random() * 3000, easing: Easing.linear }),
        withTiming(0.1, { duration: 3000 + Math.random() * 2000, easing: Easing.linear })
      ),
      -1,
      true
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  // تولید کاراکترهای تصادفی برای هر ستون
  const columnChars = Array.from({ length: 30 }).map((_, charIndex) => (
    <Text key={charIndex} style={[styles.matrixChar, { color: color + 'AA' }]}>
      {characters.charAt(Math.floor(Math.random() * characters.length))}
    </Text>
  ));

  return (
    <Animated.View style={[styles.column, animatedStyle]}>
      {columnChars}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    flexDirection: 'row',
    overflow: 'hidden',
    zIndex: -1, // در پس‌زمینه قرار بگیرد
  },
  column: {
    width: 20, // عرض هر کاراکتر
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  matrixChar: {
    fontFamily: 'Courier', // فونت مونو
    fontSize: 14,
    lineHeight: 18,
  },
});

export default MatrixRain;
