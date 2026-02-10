import React from 'react';
import { View, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const FlyOutEffect = ({ isVisible, color = '#22c55e' }) => {
  if (!isVisible) return null;

  return (
    <View style={{ position: 'absolute', inset: 0, justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
      {/* آیکون اصلی که به سمت بالا پرتاب می‌شود */}
      <MotiView
        from={{ translateY: 0, opacity: 1, scale: 1 }}
        animate={{ translateY: -height, opacity: 0, scale: 0.5 }}
        transition={{ type: 'timing', duration: 800, easing: Intl.Easing.outQuart }}
        className="z-50"
      >
        <View 
          style={{ shadowColor: color, shadowRadius: 30, shadowOpacity: 1 }}
          className="bg-slate-900 p-6 rounded-full border-2 border-cyan-400"
        >
          <Feather name="send" size={40} color={color} />
        </View>
      </MotiView>

      {/* ذرات نوری (Particles) که به دنبال آیکون می‌روند */}
      {[...Array(12)].map((_, i) => (
        <MotiView
          key={i}
          from={{ opacity: 1, scale: 1, translateX: 0, translateY: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 0, 
            translateX: (Math.random() - 0.5) * 200, 
            translateY: -height * 0.8 
          }}
          transition={{ type: 'timing', duration: 1000, delay: i * 50 }}
          style={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: color,
            shadowColor: color,
            shadowRadius: 10,
            shadowOpacity: 1
          }}
        />
      ))}
    </View>
  );
};

export default FlyOutEffect;
// منطق دکمه نگه داشتنی
const handleHold = () => {
  SoundManager.playEffect('CHARGE_UP'); // صدای شارژ
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  
  // بعد از ۳ ثانیه نگه داشتن:
  onConfirm(); 
  setIsFlying(true); // شروع انیمیشن پرتاب
};
