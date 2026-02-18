import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fingerprint, Eye } from 'lucide-react-native';
import AuthService from '../utils/AuthService';

const BiometricGuard = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleAuth = async () => {
    const result = await AuthService.authenticate();
    if (result.success) {
      setIsUnlocked(true);
    }
  };

  if (!isUnlocked) {
    return (
      <View style={styles.container}>
        <View style={styles.glassCard}>
          <Fingerprint color="#06b6d4" size={80} strokeWidth={1} />
          <Text style={styles.lockTitle}>SYSTEM LOCKED</Text>
          <Text style={styles.lockSub}>Authentication required to access CiBL Vault</Text>
          
          <TouchableOpacity onPress={handleAuth} style={styles.authButton}>
            <Text style={styles.authButtonText}>UNLOCK SYSTEM</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  glassCard: {
    padding: 40, borderRadius: 40, backgroundColor: '#0F172A',
    borderWidth: 1, borderColor: '#06b6d433', alignItems: 'center',
    shadowColor: '#06b6d4', shadowRadius: 30, shadowOpacity: 0.2
  },
  lockTitle: { fontFamily: 'Orbitron-Bold', color: '#fff', fontSize: 20, marginTop: 20 },
  lockSub: { fontFamily: 'Cairo-Bold', color: '#94A3B8', textAlign: 'center', marginTop: 10, fontSize: 12 },
  authButton: {
    marginTop: 30, paddingHorizontal: 30, paddingVertical: 15,
    borderRadius: 15, backgroundColor: '#06b6d422', borderWidth: 1, borderColor: '#06b6d4'
  },
  authButtonText: { color: '#06b6d4', fontFamily: 'Orbitron-Bold', fontSize: 12 }
});

export default BiometricGuard;
