import React from 'react';
import { View, Text, TouchableOpacity, I18nManager } from 'react-native';
import i18n from '../i18n';
import * as Updates from 'expo-updates'; // برای ری‌لود آنی در صورت تغییر جهت
import SoundManager from '../utils/SoundManager';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', rtl: false },
  { code: 'ar', name: 'العربية', flag: '🇦🇪', rtl: true },
  { code: 'jp', name: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'es', name: 'Español', flag: '🇪🇸', rtl: false },
];

const LanguagePicker = () => {
  const currentLanguage = i18n.language;

  const handleLanguageChange = async (lang) => {
    SoundManager.play('NEON_TICK');
    
    // تغییر زبان در i18next
    await i18n.changeLanguage(lang.code);

    // مدیریت جهت (RTL vs LTR)
    if (I18nManager.isRTL !== lang.rtl) {
      I18nManager.forceRTL(lang.rtl);
      // برای اعمال تغییر جهت در اندروید و iOS، اپلیکیشن باید یکبار ری‌لود شود
      setTimeout(() => {
        Updates.reloadAsync();
      }, 500);
    }
  };

  return (
    <View className="p-4 bg-slate-900/90 rounded-[35px] border border-slate-800">
      <Text className="text-slate-500 font-black text-[10px] mb-4 text-center tracking-widest">
        SELECT INTERFACE LANGUAGE
      </Text>
      
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => handleLanguageChange(lang)}
          className={`flex-row items-center p-4 mb-2 rounded-2xl border ${
            currentLanguage === lang.code ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-black/20'
          }`}
        >
          <Text className="text-2xl">{lang.flag}</Text>
          <Text className={`flex-1 ml-4 text-white font-bold ${lang.rtl ? 'text-right mr-4' : ''}`}>
            {lang.name}
          </Text>
          {currentLanguage === lang.code && (
            <View className="w-2 h-2 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LanguagePicker;
