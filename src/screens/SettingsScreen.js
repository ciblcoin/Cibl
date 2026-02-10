import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundManager from '../utils/SoundManager';

const SettingsScreen = () => {
  const [isMuted, setIsMuted] = useState(SoundManager.isMuted);
  const [isMusicOff, setIsMusicOff] = useState(SoundManager.isMusicOff);

  const toggleSound = async (val) => {
    setIsMuted(val);
    SoundManager.isMuted = val;
    await AsyncStorage.setItem('isMuted', JSON.stringify(val));
  };

  const toggleMusic = async (val) => {
    setIsMusicOff(val);
    SoundManager.isMusicOff = val;
    await AsyncStorage.setItem('isMusicOff', JSON.stringify(val));
    val ? SoundManager.stopBackgroundMusic() : SoundManager.startBackgroundMusic();
  };

  return (
    <View className="flex-1 bg-slate-950 p-8 pt-20">
      <Text className="text-cyan-400 text-3xl font-black mb-10 tracking-tighter">SETTINGS</Text>
      
      {/* Sound Effects Toggle */}
      <View className="flex-row justify-between items-center bg-slate-900/50 p-6 rounded-3xl border border-slate-800 mb-4">
        <View>
          <Text className="text-white text-lg font-bold">Sound Effects</Text>
          <Text className="text-slate-500 text-xs">UI Clicks & Duel Alerts</Text>
        </View>
        <Switch 
          value={!isMuted} 
          onValueChange={(v) => toggleSound(!v)}
          trackColor={{ false: '#1e293b', true: '#0891b2' }}
        />
      </View>

      {/* Music Toggle */}
      <View className="flex-row justify-between items-center bg-slate-900/50 p-6 rounded-3xl border border-slate-800 mb-10">
        <View>
          <Text className="text-white text-lg font-bold">Background Music</Text>
          <Text className="text-slate-500 text-xs">Cyberpunk Ambient Loop</Text>
        </View>
        <Switch 
          value={!isMusicOff} 
          onValueChange={(v) => toggleMusic(!v)}
          trackColor={{ false: '#1e293b', true: '#a855f7' }}
        />
      </View>

      {/* Logout / Reset Button */}
      <TouchableOpacity className="border border-red-500/30 p-4 rounded-2xl items-center">
        <Text className="text-red-500 font-bold">Logout Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
