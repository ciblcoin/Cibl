import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { MotiView } from 'moti';
import SoundManager from '../utils/SoundManager';

const ChallengeTimer = ({ initialSeconds, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const isPanicMode = timeLeft <= 10 && timeLeft > 0;

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);

      // در ۱۰ ثانیه آخر، با هر ثانیه صدا و لرزش ضربان قلب پخش شود
      if (timeLeft <= 10) {
        SoundManager.playEffect('HEARTBEAT');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <MotiView
      animate={{
        scale: isPanicMode ? [1, 1.2, 1] : 1,
        opacity: 1,
      }}
      transition={{
        type: 'timing',
        duration: 500,
        loop: isPanicMode, // تکرار انیمیشن در وضعیت بحرانی
      }}
      className={`p-4 rounded-2xl items-center justify-center ${
        isPanicMode ? 'bg-red-600/20' : 'bg-slate-900/50'
      }`}
    >
      <Text 
        className={`text-3xl font-black ${
          isPanicMode ? 'text-red-500' : 'text-cyan-400'
        }`}
      >
        00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
      </Text>
      
      {isPanicMode && (
        <Text className="text-red-500 text-[10px] font-bold uppercase animate-pulse">
          Critical Time!
        </Text>
      )}
    </MotiView>
  );
};

export default ChallengeTimer;
