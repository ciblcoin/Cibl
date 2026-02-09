import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCcw, LayoutGrid } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ portfolioData, totalBalance }) => {
  return (
    <View className="flex-1 bg-slate-950 px-6 pt-12">
      {/* هدر و موجودی کل */}
      <View className="items-center my-8">
        <Text className="text-slate-400 text-sm font-medium tracking-widest uppercase">Total Balance</Text>
        <View className="flex-row items-baseline mt-2">
          <Text className="text-white text-5xl font-black">$</Text>
          <Text className="text-white text-5xl font-black ml-1">
            {totalBalance.toLocaleString()}
          </Text>
        </View>
        <View className="bg-green-500/10 px-3 py-1 rounded-full mt-3">
          <Text className="text-green-400 text-xs font-bold">+2.45% (24h)</Text>
        </View>
      </View>

      {/* دکمه‌های عملیاتی (Quick Actions) */}
      <View className="flex-row justify-between mb-10">
        <ActionButton icon={<ArrowUpRight color="white" />} label="Send" color="bg-blue-600" />
        <ActionButton icon={<ArrowDownLeft color="white" />} label="Receive" color="bg-emerald-600" />
        <ActionButton icon={<RefreshCcw color="white" />} label="Swap" color="bg-orange-600" />
        <ActionButton icon={<LayoutGrid color="white" />} label="Assets" color="bg-slate-800" />
      </View>

      {/* لیست دارایی‌ها */}
      <Text className="text-white text-lg font-bold mb-4">Your Assets</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {portfolioData.map((item, index) => (
          <AssetCard key={index} asset={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const ActionButton = ({ icon, label, color }) => (
  <View className="items-center">
    <TouchableOpacity className={`${color} w-14 h-14 rounded-2xl items-center justify-center shadow-lg`}>
      {icon}
    </TouchableOpacity>
    <Text className="text-slate-400 text-xs mt-2 font-medium">{label}</Text>
  </View>
);

const AssetCard = ({ asset }) => (
  <TouchableOpacity className="bg-slate-900/50 border border-slate-800 rounded-3xl p-4 mb-3 flex-row items-center">
    <View className="w-12 h-12 bg-slate-800 rounded-full items-center justify-center mr-4">
      <Text className="text-xl font-bold">{asset.icon || '🪙'}</Text>
    </View>
    <View className="flex-1">
      <Text className="text-white font-bold text-base">{asset.name}</Text>
      <Text className="text-slate-500 text-xs uppercase">{asset.symbol}</Text>
    </View>
    <View className="items-end">
      <Text className="text-white font-bold">${asset.valueUsd.toLocaleString()}</Text>
      <Text className="text-slate-500 text-xs">{asset.balance} {asset.symbol}</Text>
    </View>
  </TouchableOpacity>
);

export default HomeScreen;
