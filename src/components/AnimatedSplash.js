import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { AnimatePresence } from 'framer-motion';

const AnimatedSplash = ({ onFinish }) => {
  useEffect(() => {
    // بعد از ۳ ثانیه انیمیشن تمام شده و وارد اپلیکیشن می‌شویم
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* هاله نور پشتی (Glow Effect) */}
      <MotiView
        from={{ opacity: 0.2, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1.2 }}
        transition={{
          type: 'timing',
          duration: 1500,
          loop: true,
        }}
        style={styles.glow}
      />

      {/* لوگوی اصلی CiBL */}
      <MotiView
        from={{ opacity: 0, scale: 0.5, translateY: 20 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 12 }}
      >
        <Image 
          source={require('./assets/icons/app-icon.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </MotiView>

      {/* متن وضعیت لودینگ نئونی */}
      <MotiText
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 500, type: 'timing' }}
        style={styles.loadingText}
      >
        INITIALIZING NEON PROTOCOL...
      </MotiText>

      {/* نوار پیشرفت باریک (Progress Bar) */}
      <View style={styles.progressContainer}>
        <MotiView
          from={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3000, type: 'timing' }}
          style={styles.progressBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    zIndex: 10,
  },
  glow: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#06b6d4',
    filter: 'blur(50px)', // اگر در وب هستید، در موبایل از shadow استفاده کنید
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 100,
  },
  loadingText: {
    color: '#06b6d4',
    marginTop: 40,
    fontFamily: 'Orbitron-Bold',
    fontSize: 10,
    letterSpacing: 2,
  },
  progressContainer: {
    width: '60%',
    height: 2,
    backgroundColor: '#1e293b',
    marginTop: 20,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#06b6d4',
    shadowColor: '#06b6d4',
    shadowRadius: 5,
    shadowOpacity: 1,
  },
});

export default AnimatedSplash;
