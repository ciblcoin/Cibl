import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, Swords, Trophy, Users } from 'lucide-react-native';
import { supabase } from '../../services/supabaseClient';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', user: 'WhaleHunter', content: 'SOL is looking bullish for the next 1 min! 🚀', type: 'text' },
    { id: '2', user: 'CiBL_Bot', content: 'User @KingCrypto just won 5.0 SOL in a duel!', type: 'announcement' },
  ]);

  // Handle sending messages
  const sendMessage = () => {
    if (message.trim().length === 0) return;
    const newMessage = {
      id: Date.now().toString(),
      user: 'You', // In production, get from Supabase Auth
      content: message,
      type: 'text'
    };
    setChatMessages([newMessage, ...chatMessages]);
    setMessage('');
  };

  return (
    <View className="flex-1 bg-brand-dark">
      {/* 1. GAMBLEFI HEADER */}
      <View className="px-6 pt-12 pb-4 border-b border-gray-900 flex-row justify-between items-center">
        <View>
          <Text className="text-white text-2xl font-black">GambleFi Room</Text>
          <View className="flex-row items-center mt-1">
            <View className="w-2 h-2 bg-brand-success rounded-full mr-2" />
            <Text className="text-gray-500 text-xs">1,240 Traders Online</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-brand-primary p-3 rounded-2xl flex-row items-center">
          <Swords color="#0A0E17" size={20} />
          <Text className="text-brand-dark font-black ml-2">DUEL</Text>
        </TouchableOpacity>
      </View>

      {/* 2. CHAT MESSAGES */}
      <FlatList
        data={chatMessages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className={`px-6 py-3 ${item.type === 'announcement' ? 'bg-brand-primary/5' : ''}`}>
            <View className="flex-row items-center">
              <Text className={`font-bold text-xs ${item.user === 'You' ? 'text-brand-secondary' : 'text-brand-primary'}`}>
                {item.user}
              </Text>
              {item.type === 'announcement' && <Trophy color="#FFD700" size={12} className="ml-2" />}
            </View>
            <Text className="text-gray-200 mt-1 text-sm leading-5">{item.content}</Text>
          </View>
        )}
      />

      {/* 3. INPUT AREA */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View className="p-4 bg-brand-card border-t border-gray-900 flex-row items-center">
          <TextInput
            className="flex-1 h-12 bg-brand-dark rounded-2xl px-4 text-white"
            placeholder="Type your prediction..."
            placeholderTextColor="#475569"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity 
            onPress={sendMessage}
            className="ml-3 bg-brand-primary w-12 h-12 rounded-2xl items-center justify-center"
          >
            <Send color="#0A0E17" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
