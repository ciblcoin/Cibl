import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { XCircle, AlertTriangle, RefreshCcw } from 'lucide-react-native';

const ErrorReceipt = ({ reason, onRetry }) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      className="bg-slate-900 border border-red-500/40 p-6 rounded-[32px] w-full items-center shadow-2xl shadow-red-500/20"
    >
      {/* آیکون ضربدر لرزان */}
      <MotiView
        from={{ rotate: '0deg' }}
        animate={{ rotate: ['-10deg', '10deg', '0deg'] }}
        transition={{ loop: true, duration: 500, type: 'timing' }}
        className="bg-red-500 rounded-full p-2 mb-4"
      >
        <XCircle color="white" size={32} />
      </MotiView>

      <Text className="text-red-400 text-sm font-bold uppercase tracking-widest mb-1">
        Transaction Failed
      </Text>

      {/* نمایش علت خطا */}
      <View className="bg-red-500/10 p-4 rounded-2xl w-full my-4 flex-row items-center border border-red-500/10">
        <AlertTriangle size={16} color="#ef4444" />
        <Text className="text-slate-300 text-xs ml-3 flex-1">
          {reason || "Network error or insufficient SOL for gas fees."}
        </Text>
      </View>

      {/* دکمه تلاش مجدد (Retry) */}
      <TouchableOpacity 
        onPress={onRetry}
        className="bg-red-600/20 border border-red-500 py-3 px-8 rounded-2xl flex-row items-center"
      >
        <RefreshCcw size={16} color="white" />
        <Text className="text-white font-bold ml-2">Try Again</Text>
      </TouchableOpacity>
    </MotiView>
  );
};
const handleTxError = (err) => {
  // ۱. صدای سنگین Thud (بسیار مهم برای القای حس لغو)
  SoundManager.playEffect('TX_FAILED');

  // ۲. لرزش شدید (Heavy Haptics)
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

  // ۳. استخراج پیام خطای قابل فهم برای کاربر
  let userFriendlyError = "Something went wrong.";
  if (err.message.includes("0x1")) userFriendlyError = "Insufficient balance for this transaction.";
  if (err.message.includes("Slippage")) userFriendlyError = "Price changed too fast. Increase slippage.";

  setErrorMessage(userFriendlyError);
  setShowErrorModal(true);
};
