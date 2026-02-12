import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { Sword } from 'lucide-react-native';
import { COLORS } from '../utils/constants';

const DuelButton = ({ onStartChallenge }) => {
  const [isCounting, setIsCounting] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const startDuel = () => {
    setIsCounting(true);
    onStartChallenge(); // فراخوانی تابع بلاکچین که قبلاً نوشتیم

    // انیمیشن پر شدن دایره نئونی در 60 ثانیه
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 60000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    let interval;
    if (isCounting && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsCounting(false);
      setSeconds(60);
      progressAnim.setValue(0);
    }
    return () => clearInterval(interval);
  }, [isCounting, seconds]);

  return (
    <TouchableOpacity 
      onPress={startDuel} 
      disabled={isCounting}
      className="items-center justify-center"
    >
      <View className="w-20 h-20 items-center justify-center rounded-full bg-slate-900 border-2 border-slate-800">
        {/* افکت درخشش نئونی (Glow) */}
        {isCounting && (
           <Animated.View 
             style={{
               position: 'absolute',
               width: '100%',
               height: '100%',
               borderRadius: 50,
               borderWidth: 4,
               borderColor: COLORS.primary,
               opacity: 0.8,
               transform: [{ scale: progressAnim.interpolate({
                 inputRange: [0, 1],
                 outputRange: [1, 1.2]
               })}]
             }}
           />
        )}
        
        {isCounting ? (
          <Text style={{ color: COLORS.primary, fontFamily: 'SpaceMono-Regular' }} className="text-xl font-bold">
            {seconds}s
          </Text>
        ) : (
          <Sword color={COLORS.primary} size={32} />
        )}
      </View>
      <Text style={{ color: COLORS.textMuted }} className="mt-2 text-xs font-bold uppercase tracking-widest">
        {isCounting ? 'Waiting for Result...' : 'Start 1m Duel'}
      </Text>
    </TouchableOpacity>
  );
};

export default DuelButton;


if (seconds === 0) {
  // فراخوانی ورکر برای دریافت برنده
  const response = await fetch('https://your-worker.cloudflare.com/resolve-winner', {
    method: 'POST',
    body: JSON.stringify({ challengeId: '...' })
  });
  const result = await response.json();
  alert(result.winner === userAddress ? "You Won! 🎉" : "Better luck next time!");
}
