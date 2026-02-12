import React from 'react';
import { View } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { CheckCircle2 } from 'lucide-react-native';

const TransactionStatus = ({ status }) => {
  if (status !== 'success') return null;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.5, translateY: 10 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 15 }}
      className="flex-row items-center mt-2 bg-green-500/10 p-2 rounded-xl border border-green-500/30"
    >
      <CheckCircle2 color="#22c55e" size={18} />
      <MotiText 
        className="text-green-500 ml-2 font-bold text-xs"
      >
        Transaction Confirmed!
      </MotiText>
    </MotiView>
  );
};