import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, Filter, feGaussianBlur, feComposite } from 'react-native-svg';
import Animated, { 
  useAnimatedProps, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedLogo = () => {
  const progress = useSharedValue(0);
  const glow = useSharedValue(0.5);

  useEffect(() => {
    // انیمیشن رسم شدن خطوط
    progress.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.quad) }),
      -1, // تکرار ابدی
      false
    );

    // انیمیشن نبض زدن درخشش
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.4, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 400 * (1 - progress.value),
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  return (
    <View style={styles.container}>
      <Svg width="150" height="150" viewBox="0 0 100 100">
        <Defs>
          <Filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
          </Filter>
        </Defs>

        {/* شش‌ضلعی متحرک */}
        <AnimatedPath
          d="M50 8L88 28V72L50 92L12 72V28L50 8Z"
          stroke="#06b6d4"
          strokeWidth="3"
          fill="none"
          strokeDasharray="400"
          animatedProps={animatedProps}
          filter="url(#glow)"
        />

        {/* بخش ثابت داخلی (C-Shape) */}
        <Path
          d="M65 35H40V65H65 M40 50H60"
          stroke="#06b6d4"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' }
});

export default AnimatedLogo;
