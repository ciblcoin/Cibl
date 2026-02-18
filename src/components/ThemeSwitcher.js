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

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const themeOptions = [
    { id: 'cyan', color: '#06b6d4', label: 'NEON' },
    { id: 'purple', color: '#D946EF', label: 'SYNTH' },
    { id: 'dark', color: '#1E293B', label: 'DARK' },
    { id: 'light', color: '#E2E8F0', label: 'LIGHT' }
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textMuted }]}>INTERFACE MODE:</Text>
      <View style={styles.row}>
        {themeOptions.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            onPress={() => toggleTheme(opt.id)}
            style={[
              styles.box,
              { backgroundColor: opt.color },
              theme.id === opt.id && [styles.activeBox, { borderColor: theme.primary }]
            ]}
          >
             {/* نمایش نام کوچک تم زیر هر دایره */}
             <Text style={styles.miniLabel}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... سایر استایل‌ها همان قبلی است ...
  miniLabel: { fontSize: 8, marginTop: 45, color: '#94A3B8', textAlign: 'center' }
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { InteractionService } from '../utils/InteractionService';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (id) => {
    toggleTheme(id);
    InteractionService.playInteraction(Themes[id]);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textMuted }]}>UI PROTOCOL</Text>
      <View style={styles.row}>
        {Object.values(Themes).map((t) => (
          <TouchableOpacity
            key={t.id}
            onPress={() => handleThemeChange(t.id)}
            style={[
              styles.swatch,
              { backgroundColor: t.primary },
              theme.id === t.id && { borderColor: '#FFF', borderWidth: 2, transform: [{ scale: 1.1 }] }
            ]}
          >
            <Text style={[styles.swatchLabel, { color: t.id === 'light' ? '#000' : '#FFF' }]}>
              {t.name.split(' ')[1]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.03)' },
  label: { fontFamily: 'Orbitron-Bold', fontSize: 10, letterSpacing: 2, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  swatch: { width: 70, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  swatchLabel: { fontSize: 8, fontFamily: 'Orbitron-Bold' }
});

export default ThemeSwitcher;
