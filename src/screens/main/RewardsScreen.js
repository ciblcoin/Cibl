import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { CiBLIcon } from '../../utils/Icons';

const { width } = Dimensions.get('window');

const RewardsScreen = () => {
  const { theme } = useTheme();
  const [points, setPoints] = useState(1250.45);
  const [isMining, setIsMining] = useState(false);

  // انیمیشن رآکتور مرکزی
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isMining) {
      rotation.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.linear }),
        -1, false
      );
      // شبیه‌سازی افزایش امتیاز
      const interval = setInterval(() => {
        setPoints(p => p + 0.01);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      rotation.value = withTiming(0);
    }
  }, [isMining]);

  const reactorStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
    shadowColor: theme.primary,
    shadowOpacity: isMining ? 0.8 : 0.2,
    shadowRadius: 20,
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.primary }]}>MINING_CORE_v2.0</Text>
      
      {/* نمایش امتیازات */}
      <View style={styles.pointsContainer}>
        <Text style={[styles.pointsLabel, { color: theme.textMuted }]}>ACCUMULATED_REWARDS</Text>
        <Text style={[styles.pointsValue, { color: theme.text }]}>{points.toFixed(2)} <Text style={{fontSize: 14}}>CIB_XP</Text></Text>
      </View>

      {/* رآکتور استخراج */}
      <View style={styles.reactorWrapper}>
        <Animated.View style={[styles.reactorOuter, reactorStyle, { borderColor: isMining ? theme.primary : theme.border }]}>
          <CiBLIcon name="Zap" size={60} color={isMining ? theme.primary : theme.textMuted} />
        </Animated.View>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>HASH_RATE</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>{isMining ? '42.5 GH/s' : '0.0'}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>MULTIPLIER</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>x1.5</Text>
          </View>
        </View>
      </View>

      {/* دکمه کنترل استخراج */}
      <TouchableOpacity 
        style={[styles.mineBtn, { backgroundColor: isMining ? '#ff4444' : theme.primary }]}
        onPress={() => setIsMining(!isMining)}
      >
        <Text style={styles.mineBtnText}>{isMining ? 'HALT_MINING' : 'INITIALIZE_MINING'}</Text>
      </TouchableOpacity>

      <Text style={[styles.footerNote, { color: theme.textMuted }]}>
        *HOLDING MORE CiBL TOKENS INCREASES YOUR HASH_RATE.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 30, paddingTop: 60, alignItems: 'center' },
  header: { fontFamily: 'Orbitron-Bold', fontSize: 18, marginBottom: 40 },
  pointsContainer: { alignItems: 'center', marginBottom: 50 },
  pointsLabel: { fontFamily: 'Courier', fontSize: 10, letterSpacing: 2 },
  pointsValue: { fontFamily: 'Orbitron-Bold', fontSize: 36, marginTop: 10 },
  reactorWrapper: { alignItems: 'center', justifyContent: 'center', marginBottom: 50 },
  reactorOuter: { width: 200, height: 200, borderRadius: 100, borderWidth: 2, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed' },
  statsRow: { flexDirection: 'row', width: width - 60, justifyContent: 'space-between', marginTop: 40 },
  statItem: { alignItems: 'center' },
  statLabel: { fontFamily: 'Courier', fontSize: 10 },
  statValue: { fontFamily: 'Orbitron-Bold', fontSize: 16, marginTop: 5 },
  mineBtn: { width: '100%', height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 120 },
  mineBtnText: { fontFamily: 'Orbitron-Bold', color: '#000', fontSize: 14 },
  footerNote: { fontFamily: 'Courier', fontSize: 9, position: 'absolute', bottom: 90, textAlign: 'center' }
});

export default RewardsScreen;
