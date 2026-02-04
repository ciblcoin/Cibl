import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Share } from 'react-native';
import { 
  User, 
  ShieldCheck, 
  Key, 
  Share2, 
  ChevronRight, 
  LogOut, 
  Coins,
  Globe
} from 'lucide-react-native';

const SettingsScreen = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const userReferralCode = "CIBL-777-WIN"; // Derived from Supabase

  const handleShareReferral = async () => {
    try {
      await Share.share({
        message: `Join me on CiBL Wallet! Use my code ${userReferralCode} and get lower fees on your first 10 swaps. Download now: https://cibl.app`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-brand-dark" showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View className="px-6 pt-12 pb-6">
        <Text className="text-white text-3xl font-black">Settings</Text>
      </View>

      {/* REFERRAL CARD (The Money Maker) */}
      <View className="px-6 mb-8">
        <View className="bg-brand-primary rounded-3xl p-6 flex-row justify-between items-center">
          <View className="flex-1 pr-4">
            <Text className="text-brand-dark font-black text-xl">Earn Passive Income</Text>
            <Text className="text-brand-dark/70 text-xs mt-1">
              Invite friends and earn 10% of their swap fees forever.
            </Text>
            <TouchableOpacity 
              onPress={handleShareReferral}
              className="bg-brand-dark mt-4 px-4 py-2 rounded-xl self-start flex-row items-center"
            >
              <Text className="text-white font-bold mr-2">{userReferralCode}</Text>
              <Share2 color="white" size={16} />
            </TouchableOpacity>
          </View>
          <Coins color="#0A0E17" size={60} opacity={0.3} />
        </View>
      </View>

      {/* SECTION: SECURITY */}
      <View className="px-6 mb-8">
        <Text className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-xs">Security</Text>
        <View className="bg-brand-card rounded-3xl overflow-hidden border border-gray-900">
          <SettingsItem 
            icon={<ShieldCheck color="#00E5FF" size={22} />} 
            label="Biometric ID" 
            hasSwitch 
            switchValue={biometricEnabled}
            onSwitchChange={setBiometricEnabled}
          />
          <SettingsItem 
            icon={<Key color="#94a3b8" size={22} />} 
            label="Show Recovery Phrase" 
          />
        </View>
      </View>

      {/* SECTION: PREFERENCES */}
      <View className="px-6 mb-8">
        <Text className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-xs">Preferences</Text>
        <View className="bg-brand-card rounded-3xl overflow-hidden border border-gray-900">
          <SettingsItem 
            icon={<Globe color="#94a3b8" size={22} />} 
            label="Network" 
            value="Mainnet Beta"
          />
          <SettingsItem 
            icon={<User color="#94a3b8" size={22} />} 
            label="Edit Profile" 
          />
        </View>
      </View>

      {/* FOOTER: LOGOUT & VERSION */}
      <View className="px-6 mb-20 items-center">
        <TouchableOpacity className="flex-row items-center p-4">
          <LogOut color="#FF4B2B" size={20} />
          <Text className="text-brand-danger font-bold ml-2">Logout Wallet</Text>
        </TouchableOpacity>
        <Text className="text-gray-600 text-xs mt-4">CiBL Wallet v1.0.0 (Production)</Text>
      </View>
    </ScrollView>
  );
};

// Helper Component for List Items
const SettingsItem = ({ icon, label, value, hasSwitch, switchValue, onSwitchChange }) => (
  <TouchableOpacity className="flex-row items-center p-5 border-b border-gray-900/50">
    <View className="w-10 h-10 items-center justify-center bg-gray-900/50 rounded-xl">
      {icon}
    </View>
    <Text className="text-white font-bold flex-1 ml-4">{label}</Text>
    
    {hasSwitch ? (
      <Switch 
        value={switchValue} 
        onValueChange={onSwitchChange}
        trackColor={{ false: "#1e293b", true: "#00C853" }}
        thumbColor="white"
      />
    ) : (
      <View className="flex-row items-center">
        {value && <Text className="text-gray-500 text-sm mr-2">{value}</Text>}
        <ChevronRight color="#475569" size={20} />
      </View>
    )}
  </TouchableOpacity>
);

export default SettingsScreen;
