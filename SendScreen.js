import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { QrCode, Info, ArrowRight } from 'lucide-react-native';

export default function SendScreen({ selectedAsset }) {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [gasEstimate, setGasEstimate] = useState(null);

  return (
    <View className="flex-1 bg-cibl-dark p-6">
      {/* نمایش دارایی انتخاب شده */}
      <View className="bg-slate-800/50 p-4 rounded-2xl mb-6 flex-row justify-between items-center border border-slate-700">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-cibl-yellow items-center justify-center">
            <Text className="font-bold text-cibl-dark">{selectedAsset.symbol[0]}</Text>
          </View>
          <View className="ml-3">
            <Text className="text-white font-bold">{selectedAsset.name}</Text>
            <Text className="text-slate-400 text-xs">Available: {selectedAsset.balance}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text className="text-cibl-blue-light font-bold">Max</Text>
        </TouchableOpacity>
      </View>

      {/* ورودی آدرس مقصد */}
      <View className="mb-6">
        <Text className="text-slate-400 mb-2 ml-1 text-sm font-medium">Recipient Address</Text>
        <View className="flex-row items-center bg-slate-900 border border-slate-700 rounded-xl px-4 py-3">
          <TextInput
            className="flex-1 text-white text-base"
            placeholder="Paste address or scan QR"
            placeholderTextColor="#666"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity className="ml-2">
            <QrCode color="#FFD700" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ورودی مقدار */}
      <View className="mb-8">
        <Text className="text-slate-400 mb-2 ml-1 text-sm font-medium">Amount to Send</Text>
        <TextInput
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white text-2xl font-bold text-center"
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#444"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* تخمین کارمزد (Gas Fee) */}
      <View className="bg-cibl-card p-4 rounded-xl mb-auto border border-slate-800">
        <View className="flex-row justify-between mb-2">
          <Text className="text-slate-500">Network Fee</Text>
          <Text className="text-white font-medium">~ $0.15</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Info size={12} color="#64748b" />
          <Text className="text-slate-500 text-[10px]">Estimated by CiBL smart gas engine</Text>
        </View>
      </View>

      {/* دکمه تایید نهایی */}
      <TouchableOpacity 
        className="bg-cibl-yellow p-5 rounded-2xl flex-row items-center justify-center"
        onPress={() => handleSendConfirmation()}
      >
        <Text className="text-cibl-dark font-extrabold text-lg mr-2">Review Transaction</Text>
        <ArrowRight color="#0A0E17" size={20} />
      </TouchableOpacity>
    </View>
  );
}
