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
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Shield, Palette, Languages, Bell, ChevronRight, LogOut, EyeOff } from 'lucide-react-native';
import i18n from '../i18n';
import SoundManager from '../utils/SoundManager';

const SettingItem = ({ icon: Icon, title, subtitle, onPress, value, type = 'link', color = '#06b6d4' }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-row items-center p-4 mb-2 bg-slate-900/40 border border-slate-800/50 rounded-3xl"
  >
    <View className="p-3 rounded-2xl bg-slate-800/50">
      <Icon color={color} size={22} />
    </View>
    <View className="ml-4 flex-1">
      <Text className="text-white font-bold text-base">{title}</Text>
      {subtitle && <Text className="text-slate-500 text-xs">{subtitle}</Text>}
    </View>
    {type === 'link' ? (
      <ChevronRight color="#475569" size={20} />
    ) : (
      <Switch 
        value={value} 
        onValueChange={onPress}
        trackColor={{ false: '#1e293b', true: '#06b6d4' }}
        thumbColor="#fff"
      />
    )}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  return (
    <ScrollView className="flex-1 bg-black p-4">
      <Text className="text-white font-black text-3xl mt-6 mb-8 tracking-tighter">SETTINGS</Text>

      {/* --- بخش امنیت (Security) --- */}
      <Text className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3 ml-2">Security Hub</Text>
      <SettingItem 
        icon={EyeOff} 
        title="Backup Secret Phrase" 
        subtitle="Protect your recovery words"
        color="#f43f5e"
        onPress={() => {/* رفتن به صفحه نمایش عبارت بازیابی */}}
      />
      <SettingItem 
        icon={Shield} 
        title="Biometric Lock" 
        subtitle="Face ID / Fingerprint"
        type="switch"
        value={true}
        onPress={() => {}}
      />

      <View className="h-6" />

      {/* --- بخش شخصی‌سازی (Personalization) --- */}
      <Text className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3 ml-2">Preference</Text>
      <SettingItem 
        icon={Languages} 
        title="Language" 
        subtitle={i18n.language.toUpperCase()}
        onPress={() => {/* باز کردن لیست زبان‌ها (بدون فارسی) */}}
      />
      <SettingItem 
        icon={Palette} 
        title="Neon Theme" 
        subtitle="Cyber Cyan (Default)"
        onPress={() => {}}
      />
      <SettingItem 
        icon={Bell} 
        title="Notifications" 
        type="switch"
        value={true}
        onPress={() => {}}
      />

      <View className="h-6" />

      {/* --- خروج و حذف (Danger Zone) --- */}
      <TouchableOpacity 
        className="flex-row items-center justify-center p-5 rounded-3xl border border-red-500/20 bg-red-500/5 mt-4"
        onPress={() => {
            SoundManager.play('TX_FAILED');
            // منطق خروج از حساب
        }}
      >
        <LogOut color="#f43f5e" size={20} />
        <Text className="text-red-500 font-black ml-2">RESET WALLET</Text>
      </TouchableOpacity>

      <Text className="text-center text-slate-700 text-[10px] font-bold mt-10 mb-10">
        CiBL v1.0.0-PROD
      </Text>
    </ScrollView>
  );
};

export default SettingsScreen;

// در SettingsScreen.js
<SettingItem 
  icon={Languages} 
  title={t('settings.language')} 
  subtitle={languages.find(l => l.code === i18n.language)?.name}
  onPress={() => setLanguageModalVisible(true)}
/>
