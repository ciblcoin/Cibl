import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CiblButton from './CiblButton';
import { CiBLIcon, ICONS } from '../utils/Icons';

const ErrorState = ({ message, onRetry }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.iconBox, { borderColor: '#ff4444' }]}>
        <CiBLIcon name={ICONS.ERROR} size={40} color="#ff4444" />
      </View>
      <Text style={[styles.title, { color: '#ff4444' }]}>CONNECTION_TERMINATED</Text>
      <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text>
      
      <CiblButton 
        title="RE-ESTABLISH CONNECTION" 
        variant="outline" 
        onPress={onRetry}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  iconBox: { width: 80, height: 80, borderRadius: 40, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontFamily: 'Orbitron-Bold', fontSize: 14, letterSpacing: 2 },
  message: { fontFamily: 'Courier', fontSize: 11, textAlign: 'center', marginTop: 10, lineHeight: 18 }
});

export default ErrorState;
