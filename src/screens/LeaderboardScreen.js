import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import { Trophy, Medal, Star } from 'lucide-react-native';

const LeaderboardScreen = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const { data } = await supabase.from('global_leaderboard').select('*');
      setLeaders(data);
    };
    fetchLeaders();
  }, []);

  const renderLeader = ({ item }) => (
    <View className={`flex-row items-center p-4 mb-2 rounded-2xl border ${
      item.rank === 1 ? 'bg-yellow-500/10 border-yellow-500' : 
      item.rank === 2 ? 'bg-slate-400/10 border-slate-400' :
      item.rank === 3 ? 'bg-orange-600/10 border-orange-600' : 'bg-slate-900/50 border-slate-800'
    }`}>
      <Text className="text-white font-bold w-8 text-center">#{item.rank}</Text>
      
      <View className="w-10 h-10 rounded-full bg-slate-800 mr-3 items-center justify-center">
        {item.rank === 1 ? <Trophy size={20} color="#EAB308" /> : <Text className="text-white">{item.username[0]}</Text>}
      </View>

      <View className="flex-1">
        <Text className="text-white font-bold">{item.display_name || item.username}</Text>
        <Text className="text-slate-500 text-xs">{item.wins_count} Wins</Text>
      </View>

      <View className="items-end">
        <Text className="text-cyan-400 font-black">{item.xp}</Text>
        <Text className="text-slate-600 text-[10px]">XP</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-950 px-6 pt-12">
      <View className="items-center mb-8">
        <Star size={40} color="#22D3EE" className="mb-2" />
        <Text className="text-white text-2xl font-black uppercase tracking-widest">Global Hall of Fame</Text>
      </View>
      
      <FlatList
        data={leaders}
        keyExtractor={(item) => item.username}
        renderItem={renderLeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
