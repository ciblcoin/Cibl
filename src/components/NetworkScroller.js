import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

const NetworkScroller = ({ activeNet, setActiveNet }) => {
  return (
    <View className="py-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6">
        {NETWORKS.map((net) => (
          <TouchableOpacity
            key={net.id}
            onPress={() => {
              setActiveNet(net.id);
              Haptics.selectionAsync(); // لرزش انتخاب
            }}
            className={`mr-4 px-5 py-2 rounded-full border ${
              activeNet === net.id 
              ? `bg-slate-900 border-white ${net.glow} shadow-lg` 
              : 'border-slate-800 bg-transparent'
            }`}
          >
            <View className="flex-row items-center">
              <Text className="text-lg mr-2">{net.icon}</Text>
              <Text className={`font-bold ${activeNet === net.id ? 'text-white' : 'text-slate-500'}`}>
                {net.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

const TotalBalance = ({ totalValue }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // انیمیشن افزایش عدد از ۰ تا مقدار واقعی
    let start = 0;
    const end = totalValue;
    const duration = 1500; // ۱.۵ ثانیه
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [totalValue]);

  return (
    <MotiView 
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="items-center my-10"
    >
      <Text className="text-slate-500 text-xs font-bold uppercase tracking-[4px] mb-2">
        Total Net Worth
      </Text>
      <View className="flex-row items-baseline">
        <Text className="text-white text-6xl font-black tracking-tighter">
          ${displayValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      </View>
      <MotiView 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ loop: true, duration: 2000 }}
        className="bg-cyan-500 h-1 w-20 rounded-full mt-4 shadow-lg shadow-cyan-500"
      />
    </MotiView>
  );
};
// در زمان موفقیت تراکنش TON
const triggerTonSuccess = () => {
  SoundManager.playEffect('TX_SUCCESS'); // صدای ثابت CiBL برای برندینگ
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  
  // نمایش رسید با تم آبی الماسی
  showReceipt({
    network: 'TON',
    symbol: 'TON',
    color: '#0098EA',
    icon: <DiamondIcon />
  });
};
