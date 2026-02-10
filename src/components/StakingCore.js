import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { Zap } from 'lucide-react-native';

const StakingVault = ({ asset, apy }) => {
  return (
    <View className="bg-slate-900 m-6 p-6 rounded-[40px] border border-cyan-500/20">
      <View className="items-center">
        {/* هسته انرژی متحرک */}
        <MotiView
          from={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ loop: true, duration: 2000, type: 'timing' }}
          className="w-32 h-32 rounded-full border-4 border-cyan-400 items-center justify-center shadow-2xl shadow-cyan-500"
        >
          <Zap color="#22d3ee" size={48} fill="#22d3ee" />
        </MotiView>
        
        <Text className="text-white text-2xl font-black mt-6">{asset} VAULT</Text>
        <Text className="text-cyan-400 font-bold text-lg">APY: {apy}%</Text>
      </View>

      <View className="flex-row justify-between mt-8">
        <View>
          <Text className="text-slate-500 text-xs">EARNED</Text>
          <Text className="text-green-400 font-bold">0.0024 {asset}</Text>
        </View>
        <TouchableOpacity 
          className="bg-cyan-500 px-6 py-3 rounded-2xl shadow-lg shadow-cyan-500/50"
          onPress={() => SoundManager.play('TX_CHARGE')}
        >
          <Text className="text-black font-black">STAKE NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
