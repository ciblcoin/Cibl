import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { MotiView } from 'moti';
import { ShoppingBag, Zap, Crown } from 'lucide-react-native';
import SoundManager from '../utils/SoundManager';

const MARKET_ITEMS = [
  { id: '1', name: 'GOLDEN WHALE BADGE', price: '500', currency: 'CIBL', icon: 'crown', color: '#fbbf24' },
  { id: '2', name: 'NEON PURPLE THEME', price: '200', currency: 'CIBL', icon: 'zap', color: '#a855f7' },
  { id: '3', name: 'DUEL PASS (X5)', price: '50', currency: 'CIBL', icon: 'sword', color: '#f43f5e' },
];

const Marketplace = () => {
  const renderItem = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 100 }}
      className="bg-slate-900/60 p-5 rounded-[35px] mb-4 border border-slate-800 flex-row items-center justify-between"
    >
      <View className="flex-row items-center">
        <View style={{ backgroundColor: `${item.color}20`, borderColor: item.color }} className="w-14 h-14 rounded-2xl items-center justify-center border">
          <Crown color={item.color} size={28} />
        </View>
        <View className="ml-4">
          <Text className="text-white font-black text-sm">{item.name}</Text>
          <Text className="text-slate-500 text-xs">PRICE: {item.price} {item.currency}</Text>
        </View>
      </View>

      <TouchableOpacity 
        onPress={() => SoundManager.play('TX_SUCCESS')}
        className="bg-white px-6 py-3 rounded-2xl"
      >
        <Text className="text-black font-black text-xs">BUY</Text>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View className="flex-1 bg-black p-6">
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-white text-3xl font-black">MARKET</Text>
        <View className="bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/30">
          <Text className="text-cyan-400 font-bold">1,240 CIBL</Text>
        </View>
      </View>

      <FlatList
        data={MARKET_ITEMS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
