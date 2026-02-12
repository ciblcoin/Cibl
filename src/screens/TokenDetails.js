import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { ArrowUpUp, ArrowDownDown, Repeat, ShoppingCart } from 'lucide-react-native';
import PortfolioChart from '../components/PortfolioChart';

const TokenDetails = ({ token, currencySymbol }) => {
  return (
    <ScrollView className="flex-1 bg-slate-950">
      {/* بخش هدر و موجودی */}
      <MotiView 
        from={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="items-center pt-12 pb-8"
      >
        <Text className="text-slate-400 font-bold uppercase tracking-widest">{token.name} Balance</Text>
        <View className="flex-row items-baseline mt-2">
          <Text className="text-white text-5xl font-black">{token.balance}</Text>
          <Text className="text-cyan-400 text-xl font-bold ml-2">{token.symbol}</Text>
        </View>
        <Text className="text-slate-500 mt-1 font-medium text-lg">
          ≈ {currencySymbol}{(token.usdValue).toLocaleString()}
        </Text>
      </MotiView>

      {/* نمودار اختصاصی توکن */}
      <PortfolioChart currencySymbol={currencySymbol} color={token.color} />

      {/* پنل عملیات نئونی (Action Hub) */}
      <View className="flex-row justify-around px-4 mb-10">
        <ActionButton icon={<ArrowUpUp color="white" />} label="Send" color="#ef4444" />
        <ActionButton icon={<ArrowDownDown color="white" />} label="Receive" color="#22c55e" />
        <ActionButton icon={<Repeat color="white" />} label="Swap" color="#a855f7" />
        <ActionButton icon={<ShoppingCart color="white" />} label="Buy" color="#0ea5e9" />
      </View>

      {/* تاریخچه تراکنش‌های اخیر این توکن */}
      <View className="px-6">
        <Text className="text-white text-lg font-bold mb-4">Recent Activity</Text>
        <TransactionList tokenSymbol={token.symbol} />
      </View>
    </ScrollView>
  );
};

// کامپوننت دکمه‌های عملیاتی
const ActionButton = ({ icon, label, color }) => (
  <TouchableOpacity className="items-center">
    <View 
      style={{ shadowColor: color, shadowOpacity: 0.4, shadowRadius: 15 }}
      className="w-14 h-14 bg-slate-900 rounded-2xl items-center justify-center border border-slate-800"
    >
      {icon}
    </View>
    <Text className="text-slate-400 text-xs mt-2 font-bold uppercase">{label}</Text>
  </TouchableOpacity>
);
