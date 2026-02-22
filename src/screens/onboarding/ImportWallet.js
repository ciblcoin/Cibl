import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CiblButton from '../../components/CiblButton';

const ImportWallet = ({ navigation }) => {
  const { theme } = useTheme();
  const [words, setWords] = useState(Array(12).fill(''));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.primary }]}>VAULT_RECOVERY</Text>
      <View style={styles.grid}>
        {words.map((w, i) => (
          <TextInput
            key={i}
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.card }]}
            placeholder={`${i + 1}.`}
            placeholderTextColor={theme.border}
            onChangeText={(val) => {
              let newWords = [...words];
              newWords[i] = val;
              setWords(newWords);
            }}
          />
        ))}
      </View>
      <CiblButton title="DECRYPT_&_IMPORT" onPress={() => navigation.replace('Dashboard')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center' },
  header: { fontFamily: 'Orbitron-Bold', fontSize: 16, textAlign: 'center', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
  input: { width: '48%', height: 45, borderWidth: 1, borderRadius: 8, marginBottom: 12, paddingHorizontal: 10, fontFamily: 'Courier' }
});

export default ImportWallet;
