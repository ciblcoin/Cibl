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
