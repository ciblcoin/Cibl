import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { Delete } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import SoundManager from '../utils/SoundManager';

const { width } = Dimensions.get('window');

const NeonKeypad = ({ onKeyPress, onDelete, onClear }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];

  const handlePress = (key) => {
    // ۱. افکت لرزش ریز (Selection Feedback)
    Haptics.selectionAsync();
    
    // ۲. صدای نت موسیقی کوتاه (هر عدد یک فرکانس متفاوت برای حس جذابیت)
    SoundManager.playEffect('KEY_PRESS'); 

    if (key === 'del') {
      onDelete();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <View className="flex-row flex-wrap justify-center items-center w-full px-4 pb-10">
      {keys.map((key, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(key)}
          activeOpacity={0.7}
          style={{ width: width / 3 - 30, height: 75 }}
          className="m-2 justify-center items-center rounded-3xl border border-slate-800 bg-slate-900/40"
        >
          {key === 'del' ? (
            <Delete color="#ef4444" size={28} />
          ) : (
            <Text className="text-white text-3xl font-black">{key}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
const AmountDisplay = ({ amount, balance, symbol, color }) => {
  const isError = parseFloat(amount) > parseFloat(balance);

  return (
    <View className="items-center py-10">
      <MotiView
        animate={{ scale: amount ? 1.1 : 1 }}
        className="flex-row items-baseline"
      >
        <Text 
          style={{ color: isError ? '#ef4444' : color, textShadowColor: isError ? '#ef4444' : color, textShadowRadius: 20 }}
          className="text-6xl font-black"
        >
          {amount || '0'}
        </Text>
        <Text className="text-slate-500 text-xl ml-2 font-bold">{symbol}</Text>
      </MotiView>
      
      {isError && (
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
          <Text className="text-red-500 font-bold">Insufficient Balance!</Text>
        </MotiView>
      )}
    </View>
  );
};
