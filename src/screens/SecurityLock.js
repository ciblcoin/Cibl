import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon, ICONS } from '../utils/Icons';
import { SecurityService } from '../utils/SecurityService';
import CiblButton from '../components/CiblButton';

const SecurityLock = ({ onAuthenticated }) => {
  const { theme } = useTheme();
  const [status, setStatus] = useState('WAITING_FOR_BIO');

  const handleAuth = async () => {
    setStatus('SCANNING...');
    const success = await SecurityService.authenticate(theme);
    if (success) {
      setStatus('ACCESS_GRANTED');
      setTimeout(onAuthenticated, 500); // ورود به برنامه بعد از نیم ثانیه
    } else {
      setStatus('ACCESS_DENIED');
    }
  };

  useEffect(() => {
    handleAuth(); // به محض باز شدن صفحه، اسکنر فعال شود
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* آیکون متحرک اسکن */}
      <View style={[styles.scanCircle, { borderColor: theme.primary, shadowColor: theme.primary }]}>
        <CiBLIcon 
          name={status === 'ACCESS_DENIED' ? ICONS.ERROR : ICONS.BIOMETRIC} 
          size={50} 
          color={status === 'ACCESS_DENIED' ? '#ff4444' : theme.primary} 
        />
        {/* خط لیزر اسکن */}
        <View style={[styles.laser, { backgroundColor: theme.primary }]} />
      </View>

      <Text style={[styles.statusText, { color: status === 'ACCESS_DENIED' ? '#ff4444' : theme.text }]}>
        {status}
      </Text>

      <Text style={[styles.info, { color: theme.textMuted }]}>
        ENCRYPTION LEVEL: MILITARY-GRADE AES-256
      </Text>

      {status === 'ACCESS_DENIED' && (
        <CiblButton title="RE-SCAN IDENTITY" onPress={handleAuth} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  scanCircle: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 2, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    marginBottom: 30
  },
  laser: {
    position: 'absolute',
    width: 100,
    height: 2,
    top: '50%',
    opacity: 0.5,
  },
  statusText: { fontFamily: 'Orbitron-Bold', fontSize: 14, letterSpacing: 2, marginBottom: 10 },
  info: { fontFamily: 'Courier', fontSize: 10, textAlign: 'center', marginTop: 20 }
});

export default SecurityLock;
