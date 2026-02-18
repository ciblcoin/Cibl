import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import { ArrowUpRight, ArrowDownLeft, Zap, history } from 'lucide-react-native';
import NetworkIcon from '../components/NetworkIcon';

// دیتای تستی برای نمودار
const data = [
  { timestamp: 1, value: 42000 }, { timestamp: 2, value: 43500 },
  { timestamp: 3, value: 41000 }, { timestamp: 4, value: 44000 },
];

const AssetDetail = ({ route }) => {
  const { network } = route.params; // دریافت اطلاعات شبکه انتخاب شده

  return (
    <ScrollView className="flex-1 bg-black p-4">
      {/* 1. Header & Balance */}
      <View className="items-center my-8">
        <NetworkIcon name={network.id} size={60} />
        <Text className="text-slate-400 font-bold mt-4 uppercase tracking-widest">
          {network.name} Balance
        </Text>
        <Text className="text-white text-5xl font-black mt-2">
          1.24 <Text className="text-cyan-400 text-2xl">{network.id}</Text>
        </Text>
        <Text className="text-green-400 font-bold mt-1">+$124.50 (2.4%)</Text>
      </View>

      {/* 2. Neon Price Chart */}
      <View className="bg-slate-900/30 rounded-3xl p-4 border border-slate-800 mb-6">
        <LineChart.Provider data={data}>
          <LineChart height={150} width={320}>
            <LineChart.Path color="#06b6d4" width={3}>
                <LineChart.Gradient color="#06b6d4" opacity={0.2} />
            </LineChart.Path>
            <LineChart.CursorCrosshair color="#06b6d4" />
          </LineChart>
        </LineChart.Provider>
      </View>

      {/* 3. Action Buttons */}
      <View className="flex-row justify-between mb-8">
        {[
          { label: 'SEND', icon: ArrowUpRight, color: '#f43f5e' },
          { label: 'RECEIVE', icon: ArrowDownLeft, color: '#10b981' },
          { label: 'SWAP', icon: Zap, color: '#f59e0b' }
        ].map((btn) => (
          <TouchableOpacity key={btn.label} className="items-center w-[30%]">
            <View className="bg-slate-900 p-4 rounded-2xl border border-slate-700 w-full items-center">
              <btn.icon color={btn.color} size={24} />
            </View>
            <Text className="text-slate-400 text-[10px] font-black mt-2">{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 4. Recent Transactions */}
      <Text className="text-white font-black mb-4 tracking-tighter text-lg">RECENT ACTIVITY</Text>
      <View className="bg-slate-900/50 rounded-3xl border border-slate-800 p-2">
        <TransactionItem type="Received" amount="+0.5 BTC" date="2h ago" status="Confirmed" />
        <TransactionItem type="Sent" amount="-0.02 BTC" date="Yesterday" status="Confirmed" />
      </View>
    </ScrollView>
  );
};

const TransactionItem = ({ type, amount, date, status }) => (
  <View className="flex-row items-center p-4 border-b border-slate-800/50">
    <View className={`p-2 rounded-full ${type === 'Received' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
      {type === 'Received' ? <ArrowDownLeft color="#10b981" size={16} /> : <ArrowUpRight color="#f43f5e" size={16} />}
    </View>
    <View className="ml-4">
      <Text className="text-white font-bold">{type}</Text>
      <Text className="text-slate-500 text-xs">{date}</Text>
    </View>
    <View className="ml-auto items-end">
      <Text className={`font-black ${amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>{amount}</Text>
      <Text className="text-slate-600 text-[10px] uppercase font-bold">{status}</Text>
    </View>
  </View>
);

export default AssetDetail;
// اضافه کردن به استایل آیکون در هدر
<MotiView
  from={{ shadowOpacity: 0.2, scale: 1 }}
  animate={{ shadowOpacity: 0.8, scale: 1.05 }}
  transition={{ loop: true, type: 'timing', duration: 2000 }}
>
  <NetworkIcon name={network.id} size={60} />
</MotiView>
