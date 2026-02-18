import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedGestureHandler, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  runOnJS,
  interpolateColor
} from 'react-native-reanimated';
import { ChevronsRight } from 'lucide-react-native';

const BUTTON_WIDTH = Dimensions.get('window').width - 60;
const BUTTON_HEIGHT = 60;
const SLIDER_SIZE = 50;
const H_THRESHOLD = BUTTON_WIDTH - SLIDER_SIZE - 10;

const SliderConfirm = ({ onConfirm, title = "SLIDE TO SEND" }) => {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => { ctx.startX = translateX.value; },
    onActive: (event, ctx) => {
      let nextX = ctx.startX + event.translationX;
      if (nextX < 0) nextX = 0;
      if (nextX > H_THRESHOLD) nextX = H_THRESHOLD;
      translateX.value = nextX;
    },
    onEnd: () => {
      if (translateX.value > H_THRESHOLD - 20) {
        translateX.value = withSpring(H_THRESHOLD);
        runOnJS(onConfirm)(); // اجرای تابع تایید نهایی
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedSliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: 1 - translateX.value / H_THRESHOLD,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.Text style={[styles.title, animatedTextStyle]}>
          {title}
        </Animated.Text>
        
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.slider, animatedSliderStyle]}>
            <ChevronsRight color="#000" size={24} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 30 },
  track: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: '#0F172A', // زمینه تیره نئونی
    borderRadius: 20,
    justifyContent: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: '#06b6d433', // درخشش Cyan
  },
  slider: {
    width: SLIDER_SIZE,
    height: SLIDER_SIZE - 2,
    backgroundColor: '#06b6d4', // رنگ نئونی دکمه
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 5,
    shadowColor: '#06b6d4',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    textAlign: 'center',
    color: '#94A3B8',
    fontFamily: 'Orbitron-Bold',
    fontSize: 12,
    letterSpacing: 2,
  }
});

export default SliderConfirm;
