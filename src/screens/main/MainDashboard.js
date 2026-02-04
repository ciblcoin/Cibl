import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Wallet, Bell, ScanLine, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { Formatters } from '../../utils/formatters';

const MainDashboard = ({ navigation }) => {
  // Mock Data (In production, these come from Supabase and Blockchain APIs)
  const totalBalance = 12450.85;
  const tokens = [
    { id: '1', name: 'Solana', symbol: 'SOL', balance: '12.5', price: 145.20, change: 5.4, logo: 'sol' },
    { id: '2', name: 'Bitcoin', symbol: 'BTC', balance: '0.045', price: 64200.10, change: -1.2, logo: 'btc' },
    { id: '3', name: 'Ethereum', symbol: 'ETH', balance: '1.2', price: 3450.50, change: 2.1, logo: 'eth' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-brand-dark">
      {/* 1. TOP HEADER */}
      <View className="px-6 py-4 flex-row justify-between items-center">
        <TouchableOpacity className="bg-brand-card p-2 rounded-full">
          <ScanLine color="#FFD700" size={24} />
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">Main Wallet</Text>
        <TouchableOpacity className="bg-brand-card p-2 rounded-full">
          <Bell color="#94a3b8" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6">
        
        {/* 2. TOTAL BALANCE SECTION */}
        <View className="items-center py-10">
          <Text className="text-gray-400 text-sm font-bold uppercase tracking-widest">Total Balance</Text>
          <Text className="text-white text-5xl font-black mt-2">
            {Formatters.formatCurrency(totalBalance)}
          </Text>
          <View className="flex-row items-center mt-2 bg-brand-success/10 px-3 py-1 rounded-full">
            <Text className="text-brand-success font-bold">+ $240.50 (24h)</Text>
          </View>
        </View>

        {/* 3. QUICK ACTIONS */}
        <View className="flex-row justify-between mb-10">
          <QuickActionBtn label="Send" icon={<ArrowUpRight color="#0A0E17"/>} primary />
          <QuickActionBtn label="Receive" icon={<ArrowDownLeft color="white"/>} />
          <QuickActionBtn label="Buy" icon={<Plus color="white"/>} />
        </View>

        {/* 4. ASSETS LIST */}
        <View className="flex-row justify-between items-end mb-4">
          <Text className="text-gray-400 font-bold text-lg">My Assets</Text>
          <TouchableOpacity>
            <Text className="text-brand-secondary text-xs">See All</Text>
          </TouchableOpacity>
        </View>

        {tokens.map((token) => (
          <TouchableOpacity 
            key={token.id} 
            onPress={() => navigation.navigate('TokenDetail', { token })}
            className="bg-brand-card p-4 rounded-3xl mb-3 flex-row items-center border border-gray-900"
          >
            {/* Token Icon Placeholder */}
            <View className="w-12 h-12 bg-gray-800 rounded-full items-center justify-center">
               <Wallet color="#FFD700" size={24} />
            </View>
            
            {/* Token Info */}
            <View className="ml-4 flex-1">
              <Text className="text-white font-bold text-lg">{token.name}</Text>
              <Text className="text-gray-500 text-xs">{token.balance} {token.symbol}</Text>
            </View>

            {/* Price Info */}
            <View className="items-end">
              <Text className="text-white font-bold text-lg">
                ${token.price.toLocaleString()}
              </Text>
              <Text className={token.change >= 0 ? "text-brand-success" : "text-brand-danger"}>
                {Formatters.formatPercent(token.change)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add spacing at the bottom for the tab bar */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

// Internal Helper Component
const QuickActionBtn = ({ label, icon, primary }) => (
  <TouchableOpacity className={`items-center justify-center px-8 py-4 rounded-3xl ${primary ? 'bg-brand-primary' : 'bg-brand-card border border-gray-800'}`}>
    {icon}
    <Text className={`text-xs mt-2 font-black ${primary ? 'text-brand-dark' : 'text-white'}`}>{label}</Text>
  </TouchableOpacity>
);

export default MainDashboard;
