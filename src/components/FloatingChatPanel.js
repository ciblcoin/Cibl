import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon } from '../utils/Icons';

const FloatingChatPanel = () => {
  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.panel, { backgroundColor: theme.background, borderLeftColor: theme.primary }]}
    >
      <View style={styles.chatHeader}>
        <Text style={[styles.chatTitle, { color: theme.primary }]}>CORE_CHAT_v1.0</Text>
        <CiBLIcon name="Users" size={20} color={theme.text} />
      </View>

      <FlatList
        data={[{ id: '1', user: 'SYSTEM', msg: 'ENCRYPTED_CHANNEL_READY' }]}
        renderItem={({ item }) => (
          <View style={styles.msgBox}>
            <Text style={{ color: theme.primary, fontSize: 10 }}>[{item.user}]:</Text>
            <Text style={{ color: theme.text, fontFamily: 'Courier' }}>{item.msg}</Text>
          </View>
        )}
        style={{ flex: 1 }}
      />

      <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
        <TextInput
          placeholder="TYPE_COMMAND..."
          placeholderTextColor={theme.textMuted}
          style={{ color: theme.text, flex: 1, fontFamily: 'Courier' }}
        />
        <CiBLIcon name="Send" size={20} color={theme.primary} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  panel: { flex: 1, borderLeftWidth: 1 },
  chatHeader: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#333' },
  chatTitle: { fontFamily: 'Orbitron-Bold', fontSize: 12 },
  msgBox: { padding: 15 },
  inputContainer: { flexDirection: 'row', padding: 15, alignItems: 'center', margin: 10, borderRadius: 10 }
});

export default FloatingChatPanel;
