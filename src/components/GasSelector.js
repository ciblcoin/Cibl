import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Zap, Clock, ShieldCheck } from 'lucide-react-native';

const GasSelector = ({ onSelect, estimates }) => {
  const [selected, setSelected] = useState('market');

  const options = [
    { id: 'low', label: 'ECO', icon: Clock, color: '#94a3b8' },
    { id: 'market', label: 'STANDARD', icon: ShieldCheck, color: '#06b6d4' },
    { id: 'fast', label: 'LIGHTNING', icon: Zap, color: '#f59e0b' },
  ];

  return (
    <View className="flex-row justify-between mt-4">
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.id}
          onPress={() => { setSelected(opt.id); onSelect(opt.id); }}
          style={{ borderColor: selected === opt.id ? opt.color : '#1e293b' }}
          className="bg-slate-900/50 p-4 rounded-3xl border w-[30%] items-center"
        >
          <opt.icon color={selected === opt.id ? opt.color : '#475569'} size={20} />
          <Text style={{ color: selected === opt.id ? opt.color : '#475569' }} className="text-[10px] font-black mt-2">
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
