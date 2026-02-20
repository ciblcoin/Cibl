import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CiblAvatar from '../components/CiblAvatar';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { CiBLIcon, ICONS } from '../utils/Icons';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const userAddress = "0x7aC0c7...A94e2"; // این از کیف‌پول لود می‌شود

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* بخش هدر و آواتار */}
      <View style={styles.header}>
        <CiblAvatar address="0x7aC0c7d23..." size={100} />
        <Text style={[styles.addressText, { color: theme.text }]}>{userAddress}</Text>
        <View style={[styles.badge, { backgroundColor: theme.primary + '22', borderColor: theme.primary }]}>
          <Text style={[styles.badgeText, { color: theme.primary }]}>LEVEL 22 SECURITY</Text>
        </View>
      </View>

      {/* تنظیمات رابط کاربری */}
      <ThemeSwitcher />

      {/* بخش امنیت و حریم خصوصی */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>SECURITY & PRIVACY</Text>
        
        <SettingItem icon={ICONS.BIOMETRIC} label="Biometric Lock" value="ACTIVE" />
        <SettingItem icon={ICONS.KEYS} label="Recovery Phrase" value="SECURED" />
        <SettingItem icon={ICONS.SECURITY} label="Two-Factor Auth" value="DISABLED" />
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={{ color: '#ff4444', fontFamily: 'Orbitron-Bold' }}>TERMINATE SESSION</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// کامپوننت کمکی برای آیتم‌های لیست
const SettingItem = ({ icon, label, value }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={[styles.item, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CiBLIcon name={icon} size={20} />
        <Text style={[styles.itemLabel, { color: theme.text }]}>{label}</Text>
      </View>
      <Text style={[styles.itemValue, { color: theme.primary }]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 30 },
  addressText: { fontFamily: 'Courier', marginTop: 15, fontSize: 16 },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, borderWidth: 1, marginTop: 10 },
  badgeText: { fontSize: 10, fontFamily: 'Orbitron-Bold' },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 10, fontFamily: 'Orbitron-Bold', marginBottom: 15, letterSpacing: 2 },
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1, 
    marginBottom: 10 
  },
  itemLabel: { marginLeft: 15, fontFamily: 'Cairo-Bold' },
  itemValue: { fontFamily: 'Orbitron-Bold', fontSize: 10 },
  logoutBtn: { alignItems: 'center', padding: 30 }
});

export default ProfileScreen;
