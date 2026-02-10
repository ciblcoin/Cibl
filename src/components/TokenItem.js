import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';

const TokenItem = ({ item, index, currencySymbol, exchangeRate }) => {
  const localValue = (parseFloat(item.usdValue) * exchangeRate).toFixed(2);

  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: index * 100 }}
      className="mb-4"
    >
      <TouchableOpacity 
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        className="flex-row items-center bg-slate-900/40 p-4 rounded-[24px] border border-slate-800"
      >
        {/* آیکون توکن با هاله نئونی */}
        <View 
          style={{ shadowColor: item.color, shadowRadius: 10, shadowOpacity: 0.5, elevation: 5 }}
          className="w-12 h-12 bg-slate-800 rounded-2xl items-center justify-center border border-slate-700"
        >
          <Text className="text-2xl">{item.icon}</Text>
        </View>

        {/* نام و نماد */}
        <View className="ml-4 flex-1">
          <Text className="text-white font-black text-lg">{item.symbol}</Text>
          <View className="flex-row items-center">
             <Text className="text-slate-500 text-xs font-bold">{item.network}</Text>
          </View>
        </View>

        {/* موجودی و ارزش ارزی */}
        <View className="items-end">
          <Text className="text-white font-bold text-base">{item.balance} {item.symbol}</Text>
          <Text className="text-cyan-400 text-xs font-medium">
            {currencySymbol}{localValue}
          </Text>
          <Text className={`text-[10px] font-bold ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {item.change}
          </Text>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};
