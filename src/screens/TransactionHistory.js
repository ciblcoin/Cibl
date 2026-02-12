import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock } from 'lucide-react-native';
import SoundManager from '../utils/SoundManager';

// همان کامپوننت انیمیشنی که پرسیدی
const TransactionStatus = ({ status }) => {
  if (status !== 'success') return (
    <View className="flex-row items-center mt-1">
      <Clock color="#94a3b8" size={14} />
      <Text className="text-slate-400 ml-1 text-[10px]">Processing...</Text>
    </View>
  );

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-row items-center mt-1 bg-green-500/10 self-start px-2 py-0.5 rounded-full border border-green-500/20"
    >
      <CheckCircle2 color="#22c55e" size={12} />
      <Text className="text-green-500 ml-1 font-bold text-[10px]">Confirmed</Text>
    </MotiView>
  );
};

const TransactionHistory = ({ networkFilter }) => {
  // دیتای نمونه تراکنش‌ها برای ۶ شبکه
  const [history, setHistory] = useState([
    { id: '1', type: 'send', amount: '0.05', symbol: 'BTC', status: 'success', date: '2 mins ago', network: 'BTC' },
    { id: '2', type: 'receive', amount: '120', symbol: 'TON', status: 'success', date: '1 hour ago', network: 'TON' },
    { id: '3', type: 'send', amount: '1.2', symbol: 'ETH', status: 'pending', date: 'Just now', network: 'ETHEREUM' },
  ]);

  const renderItem = ({ item, index }) => {
    const isSend = item.type === 'send';
    
    return (
      <MotiView
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ delay: index * 100 }}
        className="flex-row items-center justify-between bg-slate-900/50 p-4 mb-3 rounded-3xl border border-slate-800"
      >
        <View className="flex-row items-center">
          {/* آیکون جهت تراکنش */}
          <View className={`w-12 h-12 rounded-2xl items-center justify-center ${isSend ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
            {isSend ? <ArrowUpRight color="#ef4444" size={24} /> : <ArrowDownLeft color="#22c55e" size={24} />}
          </View>
          
          <View className="ml-4">
            <Text className="text-white font-bold text-base">
              {isSend ? 'Sent' : 'Received'} {item.symbol}
            </Text>
            <Text className="text-slate-500 text-xs">{item.date} • {item.network}</Text>
            {/* استفاده از انیمیشن تیک */}
            <TransactionStatus status={item.status} />
          </View>
        </View>

        <View className="items-end">
          <Text className={`font-black text-lg ${isSend ? 'text-white' : 'text-green-400'}`}>
            {isSend ? '-' : '+'}{item.amount}
          </Text>
          <TouchableOpacity onPress={() => SoundManager.play('NEON_TICK')}>
            <Text className="text-cyan-500 text-[10px] mt-1">VIEW ON EXPLORER</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    );
  };

  return (
    <View className="flex-1 px-6 pt-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-xl font-black">RECENT ACTIVITY</Text>
        <TouchableOpacity className="bg-slate-800 px-3 py-1 rounded-full">
          <Text className="text-slate-400 text-xs">See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={history.filter(tx => networkFilter === 'ALL' || tx.network === networkFilter)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TransactionHistory;
