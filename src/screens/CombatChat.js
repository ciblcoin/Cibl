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
const sendMessage = () => {
  const cleanText = shieldMessage(inputText);
  
  // اگر پیام تماماً ستاره شد (یعنی خیلی نامناسب بود)
  if (cleanText.includes('***') && cleanText.length === inputText.length) {
    showToast('SECURITY', 'Message blocked: Policy violation', 'danger');
    SoundManager.play('TX_FAILED');
    return;
  }

  // ارسال پیام تمیز به سرور/بلاک‌چین
  broadcastMessage({
    username: currentUser.name,
    message: cleanText,
    rank: currentUser.rank
  });
  
  setInputText('');
};
const [cachedTranslation, setCachedTranslation] = useState(null);

const handleTranslate = async () => {
  if (isTranslated) {
    setDisplayText(item.message);
    setIsTranslated(false);
    return;
  }

  // اگر قبلاً ترجمه شده، از حافظه بگیر و به گوگل درخواست نزن
  if (cachedTranslation) {
    setDisplayText(cachedTranslation);
    setIsTranslated(true);
    return;
  }

  setIsTranslating(true);
  const translated = await translateText(item.message, i18n.language);
  setDisplayText(translated);
  setCachedTranslation(translated); // ذخیره برای دفعات بعد
  setIsTranslating(false);
  setIsTranslated(true);
};

import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import { InteractionService } from '../utils/InteractionService';

const CombatChat = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    { id: '1', text: 'SYSTEM: Connection established via CiBL-Protocol', type: 'system' },
    { id: '2', text: 'Hey, did you secure the bridge on HyperEVM?', type: 'received' },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    
    // اجرای افکت صوتی مخصوص تم هنگام ارسال پیام
    InteractionService.playInteraction(theme);

    const newMessage = { id: Date.now().toString(), text: inputText, type: 'sent' };
    setMessages([newMessage, ...messages]);
    setInputText('');
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.messageBubble, 
      item.type === 'sent' ? 
      { alignSelf: 'flex-end', backgroundColor: theme.primary + '22', borderColor: theme.primary } : 
      styles.receivedBubble,
      item.type === 'system' && styles.systemBubble
    ]}>
      <Text style={[
        styles.messageText, 
        { color: item.type === 'sent' ? theme.primary : theme.text },
        item.type === 'system' && { color: theme.textMuted, fontSize: 10 }
      ]}>
        {item.type === 'sent' ? '> ' : ''}{item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        inverted // برای نمایش پیام‌های جدید در پایین
        contentContainerStyle={styles.listContent}
      />

      <View style={[styles.inputContainer, { borderTopColor: theme.border, backgroundColor: theme.card }]}>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="ENTER COMMAND OR MESSAGE..."
          placeholderTextColor={theme.textMuted}
          value={inputText}
          onChangeText={setInputText}
        />
        <CiBLIcon 
          name={ICONS.SEND} 
          size={24} 
          onPress={sendMessage} 
          style={{ marginLeft: 10 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 20 },
  messageBubble: {
    padding: 12,
    borderRadius: 5,
    borderLeftWidth: 3,
    marginBottom: 10,
    maxWidth: '80%',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: '#94A3B8',
  },
  systemBubble: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderLeftWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  messageText: { fontFamily: 'Courier', fontSize: 14 }, // استفاده از فونت ماشین‌تحریر
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  input: { flex: 1, fontFamily: 'Orbitron-Bold', fontSize: 12 },
});

export default CombatChat;

// یک ایده برای نمایش پیام‌های سیستم
const SystemMessage = ({ text }) => {
  const { theme } = useTheme();
  // منطق انیمیشن تایپ قطره‌چکانی حروف...
  return <Text style={{ color: theme.textMuted }}>[LOAD]: {text}</Text>;
};
