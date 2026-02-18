const renderChatItem = ({ item }) => {
  const rank = getRankInfo(item.balance); // دریافت اطلاعات رتبه بر اساس موجودی فرستنده

  return (
    <MotiView className="p-4 mb-2">
      <View className="flex-row items-center mb-1">
        {/* نام کاربری با رنگ رتبه */}
        <Text style={{ color: rank.color }} className="font-black text-xs uppercase">
          {item.username}
        </Text>
        
        {/* نشان رتبه (Rank Badge) با درخشش نئونی */}
        <View 
          style={{ borderColor: rank.color }}
          className={`ml-2 px-2 py-0.5 rounded border ${rank.glow}`}
        >
          <Text style={{ color: rank.color }} className="text-[8px] font-bold">
            {rank.title}
          </Text>
        </View>
      </View>

      <View className="bg-slate-900/80 p-3 rounded-2xl rounded-tl-none border border-slate-800">
        <Text className="text-slate-200">{item.message}</Text>
      </View>
    </MotiView>
  );
};
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Languages } from 'lucide-react-native'; // آیکون ترجمه
import { translateText } from '../services/TranslateService';
import i18n from '../i18n';

const ChatMessage = ({ item }) => {
  const [displayText, setDisplayText] = useState(item.message);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);

  const handleTranslate = async () => {
    if (isTranslated) {
      setDisplayText(item.message); // بازگشت به متن اصلی
      setIsTranslated(false);
      return;
    }

    setIsTranslating(true);
    const translated = await translateText(item.message, i18n.language);
    setDisplayText(translated);
    setIsTranslating(false);
    setIsTranslated(true);
    SoundManager.play('NEON_TICK');
  };

  return (
    <View className="mb-4 px-4">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-cyan-400 font-black text-[10px]">{item.username}</Text>
        
        {/* دکمه ترجمه گوگل */}
        <TouchableOpacity 
          onPress={handleTranslate}
          className="bg-slate-800/50 p-1 rounded-md border border-slate-700"
        >
          {isTranslating ? (
            <ActivityIndicator size="small" color="#06b6d4" />
          ) : (
            <Languages color={isTranslated ? "#22c55e" : "#475569"} size={14} />
          )}
        </TouchableOpacity>
      </View>

      <View className="bg-slate-900/80 p-3 rounded-2xl rounded-tl-none border border-slate-800">
        <Text className="text-slate-200 text-sm leading-5">
          {displayText}
        </Text>
      </View>
    </View>
  );
};
