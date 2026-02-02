import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal, ShieldCheck, Bell } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

const TokenDetailScreen = ({ route, navigation }) => {
  const [timeframe, setTimeframe] = useState('1D');
  const token = route.params?.token || {
    name: "Solana",
    symbol: "SOL",
    price: 145.2045678912,
    change: 5.24,
    network: "Solana",
    mint: "So11111111111111111111111111111111111111112"
  };

  const isPositive = token.change >= 0;

  return (
    <View className="flex-1 bg-brand-dark">
      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        
        {/* 1. Header & Price Section */}
        <View className="items-center mt-10">
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-400 text-sm font-medium">{token.name} Price</Text>
            <TouchableOpacity className="ml-2"><Bell size={16} color="#FFD700" /></TouchableOpacity>
          </View>
          <Text className="text-white text-4xl font-extrabold">
            ${token.price.toFixed(10).replace(/\.?0+$/, "")}
          </Text>
          <Text className={`text-sm font-bold mt-1 ${isPositive ? 'text-brand-success' : 'text-brand-danger'}`}>
            {isPositive ? '+' : ''}{token.change}% (24h)
          </Text>
        </View>

        {/* 2. Interactive Chart Area */}
        <View className="my-8 items-center">
          <LineChart.Provider data={[{value: 140}, {value: 142}, {value: 145}]}>
            <LineChart height={220} width={screenWidth - 48}>
              <LineChart.Path color={isPositive ? "#00C853" : "#FF4B2B"} width={2.5} />
              <LineChart.CursorCrosshair color="#FFD700" />
            </LineChart>
          </LineChart.Provider>
        </View>

        {/* 3. Timeframe Selector */}
        <View className="flex-row justify-between bg-brand-card p-1 rounded-2xl mb-8">
          {['1H', '1D', '1W', '1M', 'ALL'].map((tf) => (
            <TouchableOpacity key={tf} onPress={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-xl ${timeframe === tf ? 'bg-gray-800' : ''}`}>
              <Text className={`text-xs font-bold ${timeframe === tf ? 'text-brand-primary' : 'text-gray-500'}`}>{tf}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. Action Buttons (Send, Receive, More) */}
        <View className="flex-row justify-between mb-10">
          <QuickAction icon={<ArrowUpRight color="white"/>} label="Send" />
          <QuickAction icon={<ArrowDownLeft color="white"/>} label="Receive" />
          <QuickAction icon={<MoreHorizontal color="white"/>} label="More" />
        </View>

        {/* 5. Token Info (Market Stats) */}
        <Text className="text-gray-400 font-bold text-sm mb-4 uppercase tracking-widest">Token Info</Text>
        <View className="bg-brand-card rounded-3xl p-5 mb-6 border border-gray-800">
          <DataRow label="Symbol" value={token.symbol} />
          <DataRow label="Network" value={token.network} highlight />
          <DataRow label="Mint Address" value={token.mint} isAddress />
          <DataRow label="Market Cap" value="$12.4B" />
          <DataRow label="Total Supply" value="570M SOL" />
        </View>

        {/* 6. Security & Activity Section */}
        <Text className="text-gray-400 font-bold text-sm mb-4 uppercase tracking-widest">Security Audit</Text>
        <View className="bg-brand-card rounded-3xl p-5 mb-32 flex-row items-center justify-between border border-gray-800">
          <View className="flex-row items-center">
            <ShieldCheck color="#00E5FF" size={24} />
            <Text className="text-white font-bold ml-3">Smart Contract Secure</Text>
          </View>
          <Text className="text-brand-success font-bold">Verified</Text>
        </View>

      </ScrollView>

      {/* Fixed Buy/Sell Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-brand-dark/95 p-6 flex-row gap-x-4 border-t border-gray-900">
        <TouchableOpacity className="flex-1 bg-brand-success h-16 rounded-2xl items-center justify-center">
          <Text className="text-white font-black text-xl italic">BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-brand-danger h-16 rounded-2xl items-center justify-center">
          <Text className="text-white font-black text-xl italic">SELL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Helper Components
const QuickAction = ({ icon, label }) => (
  <TouchableOpacity className="items-center bg-brand-card px-8 py-4 rounded-3xl border border-gray-800">
    {icon}<Text className="text-white text-xs mt-2 font-bold">{label}</Text>
  </TouchableOpacity>
);

const DataRow = ({ label, value, highlight, isAddress }) => (
  <View className="flex-row justify-between py-3 border-b border-gray-900">
    <Text className="text-gray-500 text-sm">{label}</Text>
    <Text numberOfLines={1} className={`text-sm font-bold ${highlight ? 'text-brand-secondary' : 'text-white'} ${isAddress ? 'w-32 text-right' : ''}`}>
      {value}
    </Text>
  </View>
);

export default TokenDetailScreen;
