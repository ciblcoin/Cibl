import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { MotiView } from 'moti';

const TokenSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <MotiView 
      animate={{ shadowOpacity: query.length > 0 ? 0.5 : 0.2 }}
      className="mx-6 mb-6 bg-slate-900/80 border border-slate-800 rounded-2xl flex-row items-center px-4 py-1 shadow-cyan-500/40"
    >
      <Search size={20} color="#64748b" />
      <TextInput
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          onSearch(text);
        }}
        placeholder="Search tokens or paste address..."
        placeholderTextColor="#475569"
        className="flex-1 h-12 ml-3 text-white font-medium"
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={() => setQuery('')}>
          <X size={18} color="#ef4444" />
        </TouchableOpacity>
      )}
    </MotiView>
  );
};
const handleSearch = async (text) => {
  if (text.length < 2) return;

  // ۱. صدای تیک دیجیتال هنگام تایپ
  SoundManager.playEffect('NEON_TICK'); 

  // ۲. منطق تشخیص آدرس قرارداد (Regex)
  const isAddress = /^[0-9a-zA-Z]{32,44}$/.test(text);

  if (isAddress) {
    // جستجو در بلاک‌چین (مثلاً Solana یا TON)
    const tokenData = await fetchTokenFromChain(text);
    setResults([tokenData]);
  } else {
    // جستجوی متنی در لیست توکن‌های محلی و سرور
    const filtered = allTokens.filter(t => 
      t.name.toLowerCase().includes(text.toLowerCase()) || 
      t.symbol.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  }
};
<View className="flex-row items-center">
  <Text className="text-white font-bold">{item.symbol}</Text>
  <View className="ml-2 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">
    <Text className="text-[10px] text-cyan-400 font-bold uppercase">{item.network}</Text>
  </View>
</View>
