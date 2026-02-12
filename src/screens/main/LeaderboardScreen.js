import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Trophy, Medal } from 'lucide-react-native';
import { supabase } from '../../services/supabaseClient';
import { COLORS } from '../../utils/constants';

const LeaderboardScreen = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    // دریافت ۱۰ کاربر برتر بر اساس تعداد برد
    const { data, error } = await supabase
      .from('profiles')
      .select('username, total_wins, avatar_url')
      .order('total_wins', { ascending: false })
      .limit(10);

    if (!error) setLeaders(data);
  };

  const renderItem = ({ item, index }) => (
    <View className="flex-row items-center bg-slate-900/50 mb-3 p-4 rounded-2xl border border-slate-800">
      <Text className="text-slate-500 w-8 font-bold">{index + 1}</Text>
      
      <View className="w-12 h-12 rounded-full bg-slate-800 mr-4 items-center justify-center">
        {index === 0 ? <Trophy color="#FFD700" size={24} /> : 
         index === 1 ? <Medal color="#C0C0C0" size={24} /> :
         <Text style={{color: COLORS.textMuted}}>{item.username[0]}</Text>}
      </View>

      <View className="flex-1">
        <Text style={{ color: COLORS.textMain }} className="font-bold">{item.username}</Text>
        <Text style={{ color: COLORS.textMuted }} className="text-xs">Challenger Level</Text>
      </View>

      <View className="items-end">
        <Text style={{ color: COLORS.primary }} className="font-bold">{item.total_wins} Wins</Text>
        <Text className="text-green-500 text-[10px]">🔥 Hot Streak</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.dark, padding: 20 }}>
      <Text style={{ color: COLORS.textMain }} className="text-2xl font-bold mb-6 mt-10">
        Global <Text style={{ color: COLORS.primary }}>Rankings</Text>
      </Text>
      
      <FlatList
        data={leaders}
        keyExtractor={(item) => item.username}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LeaderboardScreen;
