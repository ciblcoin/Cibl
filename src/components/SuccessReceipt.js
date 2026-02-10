import React from 'react';
import { View, Text } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { CheckCircle2, ArrowUpRight, Repeat } from 'lucide-react-native';

const SuccessReceipt = ({ amount, symbol, type = 'send' }) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 12, delay: 100 }}
      className="bg-slate-900/80 border border-green-500/40 p-5 rounded-[32px] w-full items-center shadow-2xl shadow-green-500/20"
    >
      {/* آیکون تیک متحرک */}
      <MotiView
        from={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ type: 'spring', delay: 300 }}
        className="bg-green-500 rounded-full p-2 mb-4"
      >
        <CheckCircle2 color="white" size={32} />
      </MotiView>

      <Text className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">
        {type === 'send' ? 'Transfer Sent' : 'Swap Completed'}
      </Text>

      {/* نمایش مقدار با فونت دیجیتال */}
      <View className="flex-row items-center">
        <Text className="text-white text-4xl font-black">{amount}</Text>
        <Text className="text-green-400 text-xl font-bold ml-2">{symbol}</Text>
      </View>

      {/* خط جداکننده نئونی */}
      <View className="h-[1px] w-full bg-slate-800 my-4" />

      {/* جزئیات تکمیلی */}
      <View className="w-full flex-row justify-between items-center px-2">
        <View className="flex-row items-center">
          {type === 'send' ? <ArrowUpRight size={16} color="#94a3b8" /> : <Repeat size={16} color="#94a3b8" />}
          <Text className="text-slate-400 text-xs ml-1">Status: Confirmed</Text>
        </View>
        <Text className="text-cyan-400 text-xs font-bold">View on Solscan</Text>
      </View>
    </MotiView>
  );
};

export default SuccessReceipt;
// داخل تابع تایید تراکنش
const onTxConfirm = (amount, symbol) => {
  // ۱. پخش صدای جرینگ مخصوص CiBL
  SoundManager.playEffect('TX_SUCCESS'); 
  
  // ۲. لرزش فیزیکی (Haptic Feedback)
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

  // ۳. آپدیت وضعیت برای نمایش رسید
  setTransactionData({ amount, symbol, visible: true });
  
  // ۴. بعد از ۵ ثانیه رسید را به نرمی محو کن (اختیاری)
  setTimeout(() => setTransactionData(prev => ({ ...prev, visible: false })), 5000);
};
