import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import { InteractionService } from '../utils/InteractionService';

const PublicCombatChat = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const flatListRef = useRef();

  // شبیه‌سازی ورود پیام‌های عمومی (در آینده از Socket.io یا Firebase استفاده می‌شود)
  useEffect(() => {
    const welcomeMsg = {
      id: 'sys-1',
      user: 'SYSTEM',
      text: 'WELCOME TO CiBL GLOBAL TERMINAL. ENCRYPTION: ACTIVE.',
      type: 'system',
      time: new Date().toLocaleTimeString()
    };
    setMessages([welcomeMsg]);
  }, []);

  const handleSend = () => {
    if (text.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      user: '0x7a...4e2', // آدرس مختصر کاربر
      text: text,
      type: 'user',
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [newMessage, ...prev]);
    setText('');
    
    // اجرای لرزش و صدای اختصاصی تم
    InteractionService.playInteraction(theme);
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.msgWrapper, item.type === 'system' && styles.systemWrapper]}>
      <View style={styles.msgHeader}>
        <Text style={[styles.userTag, { color: item.type === 'system' ? theme.textMuted : theme.primary }]}>
          {item.user}
        </Text>
        <Text style={styles.timestamp}>{item.time}</Text>
      </View>
      
      <View style={[
        styles.bubble, 
        { backgroundColor: theme.card, borderColor: item.type === 'system' ? 'transparent' : theme.border }
      ]}>
        <Text style={[styles.msgText, { color: theme.text }]}>
          {item.type === 'user' ? '> ' : ''}{item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={90}
    >
      {/* Header بخش چت */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <CiBLIcon name={ICONS.NETWORK} size={18} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>GLOBAL_STREAM_V1.0</Text>
        <View style={[styles.onlineDot, { backgroundColor: '#22c55e' }]} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        inverted
        contentContainerStyle={styles.listPadding}
      />

      {/* Input Area */}
      <View style={[styles.inputWrapper, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="TYPE COMMAND..."
          placeholderTextColor={theme.textMuted}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSend} style={[styles.sendBtn, { backgroundColor: theme.primary }]}>
          <CiBLIcon name={ICONS.SEND} size={20} color={theme.id === 'light' ? '#FFF' : '#000'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1,
    marginTop: 40 
  },
  headerTitle: { fontFamily: 'Orbitron-Bold', fontSize: 12, marginLeft: 10, letterSpacing: 1 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, marginLeft: 8 },
  listPadding: { padding: 20 },
  msgWrapper: { marginBottom: 20 },
  systemWrapper: { opacity: 0.7 },
  msgHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  userTag: { fontFamily: 'Orbitron-Bold', fontSize: 10 },
  timestamp: { fontSize: 9, color: '#64748B' },
  bubble: { 
    padding: 12, 
    borderRadius: 4, 
    borderLeftWidth: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  msgText: { fontFamily: 'Courier', fontSize: 13, lineHeight: 18 },
  inputWrapper: { 
    flexDirection: 'row', 
    padding: 15, 
    alignItems: 'center', 
    borderTopWidth: 1 
  },
  input: { flex: 1, fontFamily: 'Courier', fontSize: 14, height: 40 },
  sendBtn: { 
    width: 45, 
    height: 45, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 10 
  }
});

export default PublicCombatChat;
