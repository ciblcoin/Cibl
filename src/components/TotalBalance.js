import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';

const RollingNumber = ({ value }) => {
  return (
    <View style={{ height: 50, overflow: 'hidden' }}>
      <MotiView
        from={{ translateY: 0 }}
        animate={{ translateY: -value * 50 }} // ارتفاع هر عدد ۵۰ پیکسل است
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Text key={num} className="text-white text-5xl font-black" style={{ height: 50 }}>
            {num}
          </Text>
        ))}
      </MotiView>
    </View>
  );
};

const TotalBalance = ({ totalValue, currencyCode }) => {
  // تبدیل عدد به آرایه‌ای از ارقام (مثلاً ۹۴۵۰ -> [9, 4, 5, 0])
  const digits = Math.floor(totalValue).toString().split('');
  const decimals = (totalValue % 1).toFixed(2).split('.')[1];

  return (
    <View className="items-center justify-center py-10">
      <Text className="text-slate-500 font-bold mb-2 tracking-widest">
        UNIVERSAL PORTFOLIO
      </Text>
      
      <View className="flex-row items-center">
        <Text className="text-cyan-400 text-3xl font-black mr-2">
          {currencyCode === 'USD' ? '$' : '€'}
        </Text>
        
        {/* نمایش اعداد چرخنده برای بخش صحیح */}
        <View className="flex-row">
          {digits.map((digit, index) => (
            <RollingNumber key={index} value={parseInt(digit)} />
          ))}
        </View>

        <Text className="text-white text-5xl font-black">.</Text>
        
        {/* بخش اعشار (معمولاً ثابت یا ساده‌تر) */}
        <Text className="text-slate-400 text-3xl font-bold mt-2">
          {decimals}
        </Text>
      </View>

      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-4 bg-cyan-500/10 px-4 py-1 rounded-full border border-cyan-500/20"
      >
        <Text className="text-cyan-400 font-bold text-xs">+2.45% TODAY</Text>
      </MotiView>
    </View>
  );
};

export default TotalBalance;
