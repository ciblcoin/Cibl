import React, { useState } from 'react';
import { View, Text, TouchableOpacity, BlurView } from 'react-native';
import { MotiView } from 'moti';
import { ShieldCheck, EyeOff, Copy } from 'lucide-react-native';
import SoundManager from '../utils/SoundManager';

const BackupSeed = ({ mnemonic }) => {
  const [isVisible, setIsVisible] = useState(false);
  const words = mnemonic.split(' ');

  return (
    <View className="flex-1 bg-black p-6">
      <View className="items-center mb-8">
        <MotiView
          animate={{ shadowOpacity: isVisible ? 0.5 : 0.2 }}
          className="bg-slate-900 p-4 rounded-full border border-cyan-500/30"
        >
          <ShieldCheck color="#22d3ee" size={40} />
        </MotiView>
        <Text className="text-white text-2xl font-black mt-4 text-center">GENESIS PHRASE</Text>
        <Text className="text-slate-500 text-center mt-2 px-6">
          This is the only way to recover your CiBL assets. If lost, they are gone forever.
        </Text>
      </View>

      {/* نمایش کلمات در شبکه ۲ ستونه */}
      <View className="flex-row flex-wrap justify-between">
        {words.map((word, index) => (
          <MotiView
            key={index}
            className="bg-slate-900/80 w-[48%] p-4 rounded-2xl mb-3 border border-slate-800"
          >
            <Text className="text-cyan-500/50 text-xs font-bold mb-1">{index + 1}</Text>
            <Text className="text-white font-bold text-lg">{isVisible ? word : '••••••'}</Text>
          </MotiView>
        ))}
      </View>

      {/* دکمه نمایش/عدم نمایش با افکت صوتی */}
      <TouchableOpacity 
        onPress={() => {
          setIsVisible(!isVisible);
          SoundManager.play(isVisible ? 'AUTH' : 'NAV_SWOOSH');
        }}
        className="mt-6 bg-slate-900 h-16 rounded-2xl flex-row items-center justify-center border border-slate-700"
      >
        <EyeOff color="#94a3b8" size={20} />
        <Text className="text-slate-300 font-bold ml-2">
          {isVisible ? 'HIDE SECRET WORDS' : 'REVEAL SEED PHRASE'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// src/utils/SecureVault.js
import * as SecureStore from 'expo-secure-store';

export const saveMnemonicSecurely = async (mnemonic) => {
  try {
    await SecureStore.setItemAsync('user_seed', mnemonic, {
      keychainAccessible: SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    });
  } catch (e) {
    console.error("Vault Error:", e);
  }
};
