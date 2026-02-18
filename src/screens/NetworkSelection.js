import React from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import NetworkIcon from '../components/NetworkIcon';

const networks = [
  { id: 'BTC', name: 'Bitcoin', chain: 'Mainnet' },
  { id: 'ETH', name: 'Ethereum', chain: 'ERC-20' },
  { id: 'SOL', name: 'Solana', chain: 'Mainnet' },
  { id: 'TON', name: 'The Open Network', chain: 'v4R2' },
];

const NetworkSelector = ({ onSelect }) => {
  return (
    <FlatList
      data={networks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity 
          onPress={() => onSelect(item)}
          className="flex-row items-center p-4 mb-3 bg-slate-900/50 border border-slate-800 rounded-3xl"
        >
          {/* رندر آیکون SVG با سایز ۳۲ */}
          <NetworkIcon name={item.id} size={32} />
          
          <View className="ml-4">
            <Text className="text-white font-bold text-lg">{item.name}</Text>
            <Text className="text-slate-500 text-xs">{item.chain}</Text>
          </View>
          
          <View className="ml-auto">
             <Text className="text-cyan-400 font-black">SELECT</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
import React from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { MotiView } from 'moti';
import NetworkIcon from '../components/NetworkIcon';

const networks = [
  { id: 'BTC', name: 'Bitcoin', chain: 'Mainnet' },
  { id: 'ETH', name: 'Ethereum', chain: 'ERC-20' },
  { id: 'SOL', name: 'Solana', chain: 'Mainnet' },
  { id: 'TON', name: 'The Open Network', chain: 'v4R2' },
  { id: 'SUI', name: 'Sui', chain: 'Mainnet' },
  { id: 'BASE', name: 'Base', chain: 'L2' },
];

const NetworkSelector = ({ onSelect }) => {
  return (
    <FlatList
      data={networks}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item, index }) => (
        <MotiView
          // حالت شروع (نامرئی و کمی پایین‌تر)
          from={{ opacity: 0, translateY: 20 }}
          // حالت نهایی (مرئی و در جای خود)
          animate={{ opacity: 1, translateY: 0 }}
          // تنظیم زمان‌بندی با تاخیر بر اساس ایندکس آیتم
          transition={{
            type: 'timing',
            duration: 500,
            delay: index * 100, // هر آیتم ۱۰۰ میلی‌ثانیه دیرتر از قبلی
          }}
        >
          <TouchableOpacity 
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
            className="flex-row items-center p-4 mb-4 bg-slate-900/80 border border-slate-800 rounded-3xl"
            style={{
                // ایجاد یک افکت درخشش ملایم برای کل کارت
                shadowColor: '#06b6d4',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            }}
          >
            <NetworkIcon name={item.id} size={36} />
            
            <View className="ml-4">
              <Text className="text-white font-black text-lg tracking-tight">{item.name}</Text>
              <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{item.chain}</Text>
            </View>
            
            <View className="ml-auto bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
               <Text className="text-cyan-400 font-black text-[10px]">CONNECT</Text>
            </View>
          </TouchableOpacity>
        </MotiView>
      )}
    />
  );
};
import * as Haptics from 'expo-haptics';

const handlePress = (item) => {
  // یک لرزش کوتاه و سبک
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  onSelect(item);
};
