import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SecurityService } from '../../utils/SecurityService';
import CiblButton from '../../components/CiblButton';

const CreateWallet = ({ navigation }) => {
  const { theme } = useTheme();
  const [isRevealed, setIsRevealed] = useState(false);
  const mnemonic = ["neon", "void", "binary", "pulse", "cyber", "node", "matrix", "shield", "flux", "alpha", "delta", "quantum"];

  const revealKeys = async () => {
    const success = await SecurityService.authenticate(theme);
    if (success) setIsRevealed(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>BACKUP_PHRASE</Text>
      <Text style={[styles.desc, { color: theme.textMuted }]}>
        WRITE DOWN THESE 12 WORDS IN ORDER AND STORE THEM OFFLINE.
      </Text>

      <View style={styles.grid}>
        {mnemonic.map((word, i) => (
          <View key={i} style={[styles.wordChip, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={{ color: theme.primary, fontSize: 10 }}>{i + 1}</Text>
            <Text style={[styles.word, { color: isRevealed ? theme.text : 'transparent' }]}>
               {isRevealed ? word : "••••"}
            </Text>
          </View>
        ))}
      </View>

      {!isRevealed ? (
        <CiblButton title="REVEAL_PRIVATE_KEYS" onPress={revealKeys} />
      ) : (
        <CiblButton title="I_HAVE_SECURED_IT" onPress={() => navigation.replace('Dashboard')} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center' },
  title: { fontFamily: 'Orbitron-Bold', fontSize: 18, textAlign: 'center', marginBottom: 10 },
  desc: { fontFamily: 'Courier', fontSize: 11, textAlign: 'center', marginBottom: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 40 },
  wordChip: { width: '48%', padding: 15, borderRadius: 10, borderWidth: 1, marginBottom: 10, flexDirection: 'row', gap: 10 },
  word: { fontFamily: 'Courier', fontSize: 14, fontWeight: 'bold' }
});

export default CreateWallet;
