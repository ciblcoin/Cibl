import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { Send } from 'lucide-react-native';

const ChatRoom = ({ duelId, userAddress }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // 1. Fetch initial messages
    fetchMessages();

    // 2. Subscribe to REALTIME changes in 'messages' table
    const channel = supabase
      .channel(`duel_${duelId}`)
      .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `duel_id=eq.${duelId}` 
      }, (payload) => {
        setMessages((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [duelId]);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('duel_id', duelId)
      .order('created_at', { ascending: false });
    if (data) setMessages(data);
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    await supabase.from('messages').insert([
      { 
        duel_id: duelId, 
        sender: userAddress, 
        content: newMessage 
      }
    ]);
    setNewMessage('');
  };

  return (
    <View className="flex-1 bg-slate-950 p-4">
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className={`mb-4 p-3 rounded-2xl max-w-[80%] ${
            item.sender === userAddress ? 'bg-yellow-500 self-end' : 'bg-slate-800 self-start'
          }`}>
            <Text className={item.sender === userAddress ? 'text-black font-bold' : 'text-white'}>
              {item.content}
            </Text>
          </View>
        )}
      />
      
      <View className="flex-row items-center mt-2 bg-slate-900 rounded-full px-4 py-2 border border-slate-700">
        <TextInput
          className="flex-1 text-white h-10"
          placeholder="Talk smack..."
          placeholderTextColor="#64748b"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Send color="#FFD700" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoom;
