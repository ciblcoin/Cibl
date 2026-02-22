import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CiBLIcon } from '../utils/Icons';

const DrawerContent = ({ navigation }) => {
  const { theme, toggleTheme, allThemes } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* بخش پروفایل و سوئیچ کیف پول */}
      <View style={[styles.profileSection, { borderBottomColor: theme.border }]}>
        <View style={[styles.avatar, { backgroundColor: theme.primary }]} />
        <View>
          <Text style={[styles.walletName, { color: theme.text }]}>MAIN_VAULT_01</Text>
          <Text style={[styles.status, { color: theme.primary }]}>SECURED_NODE</Text>
        </View>
      </View>

      <ScrollView style={styles.menuList}>
        {/* ۱. مدیریت کیف پول‌ها */}
        <MenuButton 
          icon="PlusCircle" 
          label="ADD_NEW_WALLET" 
          onPress={() => navigation.navigate('Welcome')} 
          theme={theme} 
        />
        
        {/* ۲. تنظیمات تم (بصورت افقی) */}
        <View style={styles.themeSection}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>VISUAL_INTERFACE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themeRow}>
            {Object.values(allThemes).map((t) => (
              <TouchableOpacity 
                key={t.id} 
                onPress={() => toggleTheme(t.id)}
                style={[styles.themeCircle, { backgroundColor: t.primary, borderColor: theme.id === t.id ? '#FFF' : 'transparent' }]}
              />
            ))}
          </ScrollView>
        </View>

        {/* ۳. امنیت و تنظیمات */}
        <MenuButton icon="Shield" label="SECURITY_CENTER" onPress={() => {}} theme={theme} />
        <MenuButton icon="Globe" label="NETWORK_SETTINGS" onPress={() => {}} theme={theme} />
        <MenuButton icon="FileText" label="EXPORT_SEED_PHRASE" onPress={() => {}} theme={theme} />
        
      </ScrollView>

      {/* دکمه خروج/قفل */}
      <TouchableOpacity style={styles.lockBtn}>
        <CiBLIcon name="Lock" size={20} color="#ff4444" />
        <Text style={styles.lockText}>TERMINATE_SESSION</Text>
      </TouchableOpacity>
    </View>
  );
};

const MenuButton = ({ icon, label, onPress, theme }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <CiBLIcon name={icon} size={22} color={theme.text} />
    <Text style={[styles.menuLabel, { color: theme.text }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  profileSection: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  walletName: { fontFamily: 'Orbitron-Bold', fontSize: 14 },
  status: { fontFamily: 'Courier', fontSize: 10, letterSpacing: 1 },
  menuList: { flex: 1, paddingHorizontal: 15 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, marginBottom: 5 },
  menuLabel: { fontFamily: 'Courier', fontSize: 13, marginLeft: 15 },
  themeSection: { marginVertical: 20, paddingLeft: 5 },
  sectionTitle: { fontFamily: 'Orbitron-Bold', fontSize: 10, marginBottom: 15 },
  themeRow: { flexDirection: 'row' },
  themeCircle: { width: 35, height: 35, borderRadius: 17.5, marginRight: 15, borderWidth: 2 },
  lockBtn: { flexDirection: 'row', alignItems: 'center', padding: 30, marginBottom: 20 },
  lockText: { color: '#ff4444', fontFamily: 'Orbitron-Bold', fontSize: 12, marginLeft: 10 }
});

export default DrawerContent;
