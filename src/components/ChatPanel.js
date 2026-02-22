import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon } from '../utils/Icons';

const { width } = Dimensions.get('window');

const ChatPanel = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const translateX = useSharedValue(width);

  useEffect(() => {
    translateX.value = withSpring(isOpen ? 0 : width, { damping: 15 });
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.panel, animatedStyle, { backgroundColor: theme.background, borderLeftColor: theme.primary }]}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={onClose}>
          <CiBLIcon name="ChevronRight" size={28} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.chatTitle, { color: theme.text }]}>CiBL_SECURE_CHAT</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.chatBody}>
        <Text style={[styles.terminalText, { color: theme.primary }]}>[SYSTEM]: ENCRYPTED_CHANNEL_ACTIVE</Text>
        {/* لیست پیام‌ها اینجا قرار می‌گیرد */}
      </View>

      <View style={[styles.inputArea, { backgroundColor: theme.card }]}>
        <TextInput 
          placeholder="TYPE_MESSAGE..." 
          placeholderTextColor={theme.textMuted}
          style={[styles.input, { color: theme.text }]}
        />
        <TouchableOpacity>
          <CiBLIcon name="Send" size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: width * 0.85,
    borderLeftWidth: 1,
    zIndex: 1000,
    paddingTop: 50,
  },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginBottom: 20 },
  chatTitle: { fontFamily: 'Orbitron-Bold', fontSize: 14 },
  chatBody: { flex: 1, padding: 20 },
  terminalText: { fontFamily: 'Courier', fontSize: 12 },
  inputArea: { flexDirection: 'row', alignItems: 'center', margin: 15, paddingHorizontal: 15, height: 50, borderRadius: 25 },
  input: { flex: 1, fontFamily: 'Courier', fontSize: 13 }
});

export default ChatPanel;
