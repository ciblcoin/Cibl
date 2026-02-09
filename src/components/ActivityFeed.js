import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Clock } from 'lucide-react-native';

const ActivityFeed = ({ transactions }) => {
  const renderItem = ({ item }) => (
    <View className="flex-row items-center bg-slate-900/40 p-4 rounded-2xl mb-3 border border-slate-800/50">
      {/* Transaction Icon */}
      <View className={`w-10 h-10 rounded-full items-center justify-center ${getStatusColor(item.type)}`}>
        {item.type === 'Send' ? <ArrowUpRight size={20} color="white" /> : 
         item.type === 'Receive' ? <ArrowDownLeft size={20} color="white" /> : 
         <RefreshCw size={20} color="white" />}
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-white font-bold">{item.type} {item.chain}</Text>
        <Text className="text-slate-500 text-xs">{new Date(item.timestamp).toLocaleString()}</Text>
      </View>

      <View className="items-end">
        <Text className={`font-bold ${item.type === 'Receive' ? 'text-green-400' : 'text-white'}`}>
          {item.type === 'Receive' ? '+' : '-'}{item.amount}
        </Text>
        <View className="flex-row items-center">
          {item.status === 'pending' && <Clock size={10} color="#94a3b8" className="mr-1" />}
          <Text className="text-slate-500 text-[10px] uppercase">{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const getStatusColor = (type) => {
  if (type === 'Send') return 'bg-red-500/20';
  if (type === 'Receive') return 'bg-green-500/20';
  return 'bg-blue-500/20';
};
