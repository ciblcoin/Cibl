export const TRANSACTION_HISTORY = [
  { id: 'tx1', type: 'send', network: 'TON', amount: '25.0', symbol: 'TON', status: 'success', date: '2026-02-09 14:20', explorerUrl: '...' },
  { id: 'tx2', type: 'receive', network: 'SOLANA', amount: '1.2', symbol: 'SOL', status: 'success', date: '2026-02-08 09:15', explorerUrl: '...' },
  { id: 'tx3', type: 'swap', network: 'ETHEREUM', amount: '0.5 ETH ➔ 1500 USDT', symbol: '', status: 'failed', date: '2026-02-07 18:30', explorerUrl: '...' },
  { id: 'tx4', type: 'send', network: 'BITCOIN', amount: '0.002', symbol: 'BTC', status: 'pending', date: '2026-02-09 19:10', explorerUrl: '...' },
];
import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { MotiView } from 'moti';
import { ArrowUpRight, ArrowDownLeft, Repeat, ExternalLink } from 'lucide-react-native';

const HistoryItem = ({ tx, index }) => {
  const getIcon = () => {
    switch (tx.type) {
      case 'send': return <ArrowUpRight color="#ef4444" size={20} />;
      case 'receive': return <ArrowDownLeft color="#22c55e" size={20} />;
      case 'swap': return <Repeat color="#a855f7" size={20} />;
      default: return null;
    }
  };

  const statusColor = tx.status === 'success' ? 'text-green-500' : tx.status === 'failed' ? 'text-red-500' : 'text-yellow-500';

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 50 }}
      className="mb-4 mx-6 flex-row items-center bg-slate-900/60 p-4 rounded-3xl border border-slate-800"
    >
      {/* آیکون نوع تراکنش */}
      <View className="bg-slate-800 p-3 rounded-2xl mr-4">
        {getIcon()}
      </View>

      {/* جزئیات */}
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="text-white font-bold text-base uppercase">{tx.type}</Text>
          <View className="ml-2 px-1.5 py-0.5 bg-slate-800 rounded-md border border-slate-700">
            <Text className="text-[10px] text-cyan-400 font-black">{tx.network}</Text>
          </View>
        </View>
        <Text className="text-slate-500 text-xs mt-1">{tx.date}</Text>
      </View>

      {/* مقدار و وضعیت */}
      <View className="items-end">
        <Text className="text-white font-black text-sm">{tx.amount} {tx.symbol}</Text>
        <Text className={`${statusColor} text-[10px] font-bold uppercase mt-1 tracking-tighter`}>
          {tx.status}
        </Text>
      </View>

      {/* لینک به اکسپلورر */}
      <TouchableOpacity onPress={() => Linking.openURL(tx.explorerUrl)} className="ml-3">
        <ExternalLink size={16} color="#475569" />
      </TouchableOpacity>
    </MotiView>
  );
};
