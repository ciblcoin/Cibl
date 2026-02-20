import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Themes } from '../data/Themes';
import { CiBLIcon } from '../utils/Icons';

const ThemeManager = () => {
  const { theme, toggleTheme, isMatrixUnlocked } = useTheme();

  // فیلتر کردن تم‌ها: اگر ماتریکس قفل بود، در لیست نشان داده نشود
  const availableThemes = Object.values(Themes).filter(t => 
    t.id !== 'matrix' || isMatrixUnlocked
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.textMuted }]}>INTERFACE PROTOCOLS</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {availableThemes.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => toggleTheme(item.id)}
            style={[
              styles.themeCard,
              { 
                backgroundColor: item.card, 
                borderColor: theme.id === item.id ? item.primary : 'transparent' 
              }
            ]}
          >
            <View style={[styles.colorPreview, { backgroundColor: item.primary }]} />
            <Text style={[styles.themeName, { color: item.text }]}>{item.name}</Text>
            {theme.id === item.id && (
              <View style={styles.activeBadge}>
                <CiBLIcon name="CircleCheckBig" size={12} color={item.primary} />
              </View>
            )}
          </TouchableOpacity>
        ))}
        
        {!isMatrixUnlocked && (
          <View style={[styles.themeCard, styles.lockedCard]}>
            <CiBLIcon name="Lock" size={20} color="#444" />
            <Text style={styles.lockedText}>LOCKED</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  title: { fontFamily: 'Orbitron-Bold', fontSize: 10, letterSpacing: 2, marginBottom: 15, paddingLeft: 20 },
  themeCard: {
    width: 120,
    height: 100,
    borderRadius: 16,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPreview: { width: 30, height: 30, borderRadius: 15, marginBottom: 8 },
  themeName: { fontFamily: 'Orbitron-Bold', fontSize: 9, textAlign: 'center' },
  activeBadge: { position: 'absolute', top: 8, right: 8 },
  lockedCard: { backgroundColor: '#111', borderStyle: 'dashed', borderColor: '#333' },
  lockedText: { color: '#444', fontSize: 8, marginTop: 5, fontFamily: 'Orbitron-Bold' }
});

export default ThemeManager;
