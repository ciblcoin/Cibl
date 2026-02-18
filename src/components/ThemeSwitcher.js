import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textMuted }]}>UI PROTOCOL:</Text>
      <View style={styles.row}>
        {['cyan', 'purple'].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => toggleTheme(t)}
            style={[
              styles.box,
              { backgroundColor: t === 'cyan' ? '#06b6d4' : '#D946EF' },
              theme.id === t && styles.activeBox
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontFamily: 'Orbitron-Bold', fontSize: 10, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 15 },
  box: { width: 40, height: 40, borderRadius: 10, borderWeight: 2, borderColor: 'transparent' },
  activeBox: { borderColor: '#FFF', transform: [{ scale: 1.1 }] }
});
