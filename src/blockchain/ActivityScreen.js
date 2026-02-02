import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { CheckCircle2, Clock, XCircle, ExternalLink, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

const TRANSACTION_STATUS = {
  CONFIRMED: { color: '#00C853', icon: <CheckCircle2 size={16} color="#00C853" />, label: 'Confirmed' },
  PENDING: { color: '#FFD700', icon: <Clock size={16} color="#FFD700" />, label: 'Pending' },
  FAILED: { color: '#FF4B2B', icon: <XCircle size={16} color="#FF4B2B" />, label: 'Failed' },
};

export default function ActivityFeed({ transactions }) {
  return (
    <View className="flex-1 bg-cibl-dark p-6">
      <Text className="text-2xl font-bold text-white mb-6">Activity</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} />
        ))}
      </ScrollView>
    </View>
  );
}

const TransactionItem = ({ tx }) => {
  const status = TRANSACTION_STATUS[tx.status];
  
  // تابع برای باز کردن بلاک‌اکسپلورر بر اساس شبکه
  const openExplorer = () => {
    const baseUrl = {
      SOL: `https://solscan.io/tx/${tx.hash}`,
      ETH: `https://etherscan.io/tx/${tx.hash}`,
      BSC: `https://bscscan.com/tx/${tx.hash}`,
      SUI: `https://suiscan.xyz/mainnet/tx/${tx.hash}`
    }[tx.chain];
    Linking.openURL(baseUrl);
  };

  return (
    <TouchableOpacity 
      className="bg-cibl-card p-4 rounded-2xl mb-4 border border-slate-800"
      onLongPress={openExplorer}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          {/* آیکون نوع تراکنش (ارسال یا دریافت) */}
          <View className={`w-10 h-10 rounded-full items-center justify-center ${tx.type === 'SEND' ? 'bg-slate-800' : 'bg-cibl-blue-dark/20'}`}>
            {tx.type === 'SEND' ? <ArrowUpRight color="#94a3b8" /> : <ArrowDownLeft color="#00E5FF" />}
          </View>
          
          <View className="ml-3">
            <Text className="text-white font-bold text-base">
              {tx.type === 'SEND' ? `Sent ${tx.asset}` : `Received ${tx.asset}`}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-slate-500 text-xs mr-2">{tx.date}</Text>
              <View className="flex-row items-center gap-1">
                {status.icon}
                <Text style={{ color: status.color }} className="text-[10px] font-bold uppercase">
                  {status.label}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="items-end">
          <Text className={`font-bold ${tx.type === 'SEND' ? 'text-white' : 'text-cibl-blue-light'}`}>
            {tx.type === 'SEND' ? '-' : '+'}{tx.amount} {tx.asset}
          </Text>
          <TouchableOpacity onPress={openExplorer} className="mt-1">
            <ExternalLink size={14} color="#475569" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
