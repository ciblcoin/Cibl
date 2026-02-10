import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { ArrowDown, Repeat, Zap } from 'lucide-react-native';
import SoundManager from '../utils/SoundManager';

const SwapScreen = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('0.00');

  const handleSwapTrigger = () => {
    // افکت صوتی شارژ شدن و لرزش
    SoundManager.play('TX_CHARGE');
    // منطق تبدیل ارز در اینجا قرار می‌گیرد
  };

  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-white text-3xl font-black mb-10">NEON SWAP</Text>

      {/* کارت مبدا (From) */}
      <View className="bg-slate-900 p-5 rounded-[32px] border border-cyan-500/20">
        <Text className="text-slate-500 text-xs mb-2">YOU SEND</Text>
        <View className="flex-row justify-between items-center">
          <TextInput
            placeholder="0.0"
            placeholderTextColor="#475569"
            keyboardType="decimal-pad"
            value={fromAmount}
            onChangeText={setFromAmount}
            className="text-white text-3xl font-bold flex-1"
          />
          <View className="bg-orange-500/20 px-4 py-2 rounded-2xl border border-orange-500/40">
            <Text className="text-orange-500 font-bold">BTC</Text>
          </View>
        </View>
      </View>

      {/* آیکون اتصال با انیمیشن چرخش */}
      <TouchableOpacity 
        className="align-center self-center -my-4 z-10 bg-black p-3 rounded-full border border-slate-800"
        onPress={() => SoundManager.play('NEON_TICK')}
      >
        <Repeat color="#06b6d4" size={24} />
      </TouchableOpacity>

      {/* کارت مقصد (To) */}
      <View className="bg-slate-900 p-5 rounded-[32px] border border-blue-500/20">
        <Text className="text-slate-500 text-xs mb-2">YOU RECEIVE (ESTIMATED)</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-3xl font-bold">{toAmount}</Text>
          <View className="bg-blue-500/20 px-4 py-2 rounded-2xl border border-blue-500/40">
            <Text className="text-blue-500 font-bold">TON</Text>
          </View>
        </View>
      </View>

      {/* دکمه نهایی با افکت Glow */}
      <TouchableOpacity 
        onPress={handleSwapTrigger}
        className="mt-10 bg-cyan-500 h-20 rounded-[30px] items-center justify-center shadow-2xl shadow-cyan-500"
      >
        <View className="flex-row items-center">
          <Zap color="black" size={24} fill="black" />
          <Text className="text-black font-black text-xl ml-2">IGNITE SWAP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
