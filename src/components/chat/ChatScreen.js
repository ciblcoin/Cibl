const WhaleArrival = ({ username, visible }) => (
  <AnimatePresence>
    {visible && (
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="absolute top-20 self-center z-50 bg-red-600/20 border-2 border-red-500 p-4 rounded-[30px] shadow-2xl shadow-red-500/50"
      >
        <View className="flex-row items-center">
          <Text className="text-red-500 font-black text-lg animate-pulse">⚠️ WHALE ALERT: </Text>
          <Text className="text-white font-black text-lg">{username} ENTERED THE ARENA</Text>
        </View>
      </MotiView>
    )}
  </AnimatePresence>
);

import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // ۱. لود کردن پیام‌های قدیمی در ابتدای ورود
    fetchMessages().then(setMessages);

    // ۲. گوش دادن به پیام‌های جدیدی که دیگران می‌فرستند
    const channel = supabase
      .channel('public-chat')
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'messages' }, 
          (payload) => {
            setMessages((prev) => [...prev, payload.new]);
          }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // کد رندر کردن لیست چت...
};
