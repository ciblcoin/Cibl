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
