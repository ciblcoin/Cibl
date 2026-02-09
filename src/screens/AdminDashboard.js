import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [suspects, setSuspects] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    const { data: statsData } = await supabase.from('admin_stats').select('*').single();
    const { data: suspectData } = await supabase.from('suspicious_users').select('*');
    setStats(statsData);
    setSuspects(suspectData);
  };

  return (
    <ScrollView className="flex-1 bg-slate-950 p-6">
      <Text className="text-white text-3xl font-black mb-6">CiBL COMMAND CENTER</Text>

      {/* بخش آمار کل */}
      <View className="flex-row flex-wrap justify-between mb-8">
        <StatCard title="Total Users" value={stats?.total_users} color="text-blue-400" />
        <StatCard title="Revenue" value={`$${stats?.total_revenue_usd?.toFixed(2)}`} color="text-green-400" />
      </View>

      {/* لیست کاربران مشکوک */}
      <Text className="text-red-500 font-bold mb-4">⚠️ Suspicious Activity (Multi-Accounters)</Text>
      {suspects.map((s, index) => (
        <View key={index} className="bg-red-900/20 p-4 rounded-xl border border-red-900/50 mb-3">
          <Text className="text-white font-bold">Device: {s.device_id.substring(0, 10)}...</Text>
          <Text className="text-red-400">Accounts: {s.usernames.join(', ')}</Text>
          <TouchableOpacity className="mt-2 bg-red-600 px-3 py-1 rounded-lg self-start">
            <Text className="text-white text-xs">Block Device</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const StatCard = ({ title, value, color }) => (
  <View className="bg-slate-900 p-4 rounded-2xl w-[48%] mb-4 border border-slate-800">
    <Text className="text-slate-500 text-xs mb-1 uppercase">{title}</Text>
    <Text className={`text-xl font-black ${color}`}>{value}</Text>
  </View>
);

export default AdminDashboard;
