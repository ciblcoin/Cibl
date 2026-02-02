import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import { ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react-native';

const TokenDetail = ({ route }) => {
  const { token } = route.params; // Data from Dashboard

  return (
    <View className="flex-1 bg-brand-dark">
      <ScrollView className="px-6 py-4">
        {/* Price Header */}
        <View className="items-center py-6">
          <Text className="text-gray-400 text-sm">{token.name} Price</Text>
          <Text className="text-white text-4xl font-extrabold mt-1">
            ${token.price.toFixed(10)}
          </Text>
          <Text className="text-brand-success font-bold">+5.24%</Text>
        </View>

        {/* Chart Area */}
        <View className="h-48 my-4">
          {/* Chart logic here */}
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between my-6">
          <ActionButton label="Send" icon={<ArrowUpRight color="white"/>} />
          <ActionButton label="Receive" icon={<ArrowDownLeft color="white"/>} />
          <ActionButton label="Swap" icon={<ShieldCheck color="white"/>} />
        </View>

        {/* Token Info Table */}
        <View className="bg-brand-card rounded-3xl p-5 mb-32">
          <InfoRow label="Market Cap" value="$1.2B" />
          <InfoRow label="Circulating Supply" value="850M" />
          <InfoRow label="Holders" value="12,450" />
        </View>
      </ScrollView>

      {/* Floating Buy/Sell Buttons */}
      <View className="absolute bottom-0 w-full p-6 bg-brand-dark/90 flex-row gap-x-4 border-t border-gray-800">
        <TouchableOpacity className="flex-1 bg-brand-success h-14 rounded-2xl items-center justify-center">
          <Text className="text-white font-black text-lg">BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-brand-danger h-14 rounded-2xl items-center justify-center">
          <Text className="text-white font-black text-lg">SELL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TokenDetail;
