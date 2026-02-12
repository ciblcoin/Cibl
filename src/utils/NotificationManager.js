import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { Sword, Send } from 'lucide-react-native';

const ChatScreen = () => {
  return (
    <View className="flex-1 bg-slate-950">
      {/* لیست پیام‌ها */}
      <FlatList
        data={MOCK_CHATS}
        renderItem={({ item }) => (
          <MotiView from={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-4 mb-2">
            <View className="flex-row items-center mb-1">
              <Text className="text-cyan-400 font-black text-xs uppercase">{item.username}</Text>
              <View className="ml-2 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                <Text className="text-[8px] text-slate-400">RANK: {item.rank}</Text>
              </View>
            </View>
            <View className="bg-slate-900/80 p-3 rounded-2xl rounded-tl-none border border-slate-800">
              <Text className="text-slate-200">{item.message}</Text>
            </View>
          </MotiView>
        )}
      />
