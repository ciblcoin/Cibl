// src/components/SecurityDashboard.js
import { ShieldCheck, ShieldAlert, Skull } from 'lucide-react-native';

const SecurityDashboard = () => {
  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-white text-3xl font-black mb-8">SECURE SECTOR</Text>

      {/* کارت Whitelisting */}
      <TouchableOpacity className="bg-slate-900 border border-cyan-500/30 p-5 rounded-[32px] mb-6 shadow-lg shadow-cyan-500/10">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-cyan-400 font-bold text-lg">Address Whitelisting</Text>
            <Text className="text-slate-500 text-xs">Only send to trusted nodes</Text>
          </View>
          <ShieldCheck color="#22c55e" size={32} />
        </View>
      </TouchableOpacity>

      {/* کارت خطر Self-Destruct */}
      <TouchableOpacity className="bg-red-950/20 border border-red-500/40 p-5 rounded-[32px]">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-red-500 font-bold text-lg">Self-Destruct Protocol</Text>
            <Text className="text-red-900 text-xs font-bold uppercase">Nuclear Option: Enabled</Text>
          </View>
          <Skull color="#ef4444" size={32} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
import React from 'react';
import { View, Text } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { BellRing, TrendingUp, ArrowDownCircle } from 'lucide-react-native';

const NeonToast = ({ visible, title, message, type = 'info' }) => {
  const colors = {
    success: '#22c55e',
    danger: '#ef4444',
    info: '#06b6d4',
    warning: '#f59e0b'
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotiView
          from={{ translateY: -100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: -100, opacity: 0 }}
          className="absolute top-12 left-4 right-4 z-[100]"
        >
          <View 
            style={{ 
              backgroundColor: '#0f172a',
              borderColor: colors[type],
              borderWidth: 1,
              shadowColor: colors[type],
              shadowRadius: 15,
              shadowOpacity: 0.4 
            }}
            className="rounded-[24px] p-4 flex-row items-center"
          >
            <View className="mr-3">
              {type === 'success' ? <ArrowDownCircle color={colors.success} size={24} /> : <BellRing color={colors.info} size={24} />}
            </View>
            <View className="flex-1">
              <Text className="text-white font-black text-sm uppercase tracking-tighter">{title}</Text>
              <Text className="text-slate-400 text-xs">{message}</Text>
            </View>
          </MotiView>
        </MotiView>
      )}
    </AnimatePresence>
  );
};
import * as Notifications from 'expo-notifications';

// تنظیم نحوه نمایش ناتیفیکیشن
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // پخش صدای اختصاصی CiBL
    shouldSetBadge: true,
  }),
});

// ارسال ناتیفیکیشن تستی برای دریافت TON
const notifyDeposit = async (amount, symbol) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "💎 ASSET RECEIVED",
      body: `You just received ${amount} ${symbol} on TON Network!`,
      data: { url: 'cibl://history' },
      sound: 'deposit_jingle.wav', // صدای اختصاصی
    },
    trigger: null, // ارسال فوری
  });
};
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

      {/* نوار ارسال پیام و دکمه دوئل */}
      <View className="p-4 bg-slate-900/90 border-t border-slate-800 flex-row items-center">
        <TouchableOpacity className="bg-red-500/20 p-3 rounded-full border border-red-500/50 mr-3">
          <Sword color="#ef4444" size={24} />
        </TouchableOpacity>
        <TextInput 
          placeholder="Message or challenge..." 
          placeholderTextColor="#475569"
          className="flex-1 text-white bg-black/50 h-12 px-4 rounded-2xl border border-slate-800"
        />
        <TouchableOpacity className="ml-3">
          <Send color="#06b6d4" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
