import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowDown, Settings2, ShieldAlert, RefreshCw } from 'lucide-react-native';

const SwapScreen = () => {
  const [payAmount, setPayAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [isRisk, setIsRisk] = useState(false); // To toggle security warning

  return (
    <View className="flex-1 bg-brand-dark p-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8 mt-4">
        <Text className="text-white text-2xl font-bold">Swap</Text>
        <TouchableOpacity className="p-2 bg-brand-card rounded-full">
          <Settings2 color="#94a3b8" size={20} />
        </TouchableOpacity>
      </View>

      <View className="bg-brand-card rounded-3xl p-4 border border-gray-800">
        {/* Input: Pay */}
        <View className="p-4 bg-gray-900/50 rounded-2xl mb-2">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 font-bold">You Pay</Text>
            <Text className="text-gray-500">Balance: 1.50 SOL</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <TextInput
              className="text-white text-3xl font-extrabold flex-1"
              placeholder="0"
              placeholderTextColor="#444"
              keyboardType="numeric"
              value={payAmount}
              onChangeText={setPayAmount}
            />
            <TouchableOpacity className="bg-brand-dark px-3 py-2 rounded-xl border border-gray-700 flex-row items-center">
              <Text className="text-white font-bold mr-2">SOL</Text>
              <ArrowDown size={14} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Swap Direction Icon */}
        <View className="items-center -my-4 z-10">
          <View className="bg-brand-dark p-2 rounded-full border-2 border-brand-card">
            <ArrowDown color="#FFD700" size={20} />
          </View>
        </View>

        {/* Input: Receive */}
        <View className="p-4 bg-gray-900/50 rounded-2xl mt-2">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 font-bold">You Receive</Text>
            <Text className="text-gray-500">~$0.00</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <TextInput
              className="text-white text-3xl font-extrabold flex-1"
              placeholder="0"
              placeholderTextColor="#444"
              editable={false}
              value={receiveAmount}
            />
            <TouchableOpacity className="bg-brand-primary px-3 py-2 rounded-xl flex-row items-center">
              <Text className="text-brand-dark font-bold mr-2">Select Token</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Security Warning (Honeypot Scanner) */}
      {isRisk && (
        <View className="mt-4 bg-brand-danger/10 p-4 rounded-2xl flex-row items-center border border-brand-danger/30">
          <ShieldAlert color="#FF4B2B" size={24} />
          <View className="ml-3 flex-1">
            <Text className="text-brand-danger font-bold text-sm">High Risk Detected</Text>
            <Text className="text-brand-danger/70 text-xs">This token has low liquidity or honeypot risk.</Text>
          </View>
        </View>
      )}

      {/* Transaction Details */}
      <View className="mt-6 px-2">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500 text-xs">Fee (0.6%)</Text>
          <Text className="text-white text-xs">$0.45</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500 text-xs">Price Impact</Text>
          <Text className="text-brand-success text-xs">{"<"} 0.01%</Text>
        </View>
      </View>

      {/* Main Action Button */}
      <TouchableOpacity 
        className={`mt-auto mb-4 h-16 rounded-2xl items-center justify-center ${isRisk ? 'bg-gray-800' : 'bg-brand-primary'}`}
        disabled={isRisk}
      >
        <Text className="text-brand-dark font-black text-xl">SWAP NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwapScreen;
