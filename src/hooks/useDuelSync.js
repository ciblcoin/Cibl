import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import SoundManager from '../utils/SoundManager';

export const useDuelSync = (challengeId) => {
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    if (!challengeId) return;

    // ۱. ایجاد اشتراک زنده روی ردیف خاص این چالش
    const channel = supabase
      .channel(`duel_${challengeId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'challenges',
          filter: `id=eq.${challengeId}`,
        },
        (payload) => {
          setChallenge(payload.new);

          // ۲. اگر وضعیت از open به active تغییر کرد -> پخش افکت شروع
          if (payload.old.status === 'open' && payload.new.status === 'active') {
            SoundManager.playEffect('CHALLENGE_START');
          }

          // ۳. اگر برنده مشخص شد
          if (payload.new.status === 'completed' && payload.new.winner_id) {
            const isWinner = payload.new.winner_id === supabase.auth.user()?.id;
            SoundManager.playEffect(isWinner ? 'WIN' : 'LOSS');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [challengeId]);

  return challenge;
};

import { MotiView } from 'moti';

const WaitingScreen = () => (
  <View className="flex-1 items-center justify-center bg-slate-950">
    <MotiView
      from={{ opacity: 0.3, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1.1 }}
      transition={{ type: 'timing', duration: 1000, loop: true }}
      className="w-40 h-40 rounded-full border-4 border-cyan-500/50 items-center justify-center"
    >
      <Text className="text-cyan-400 font-bold animate-pulse">FINDING RIVAL...</Text>
    </MotiView>
    <Text className="text-slate-500 mt-6">Searching the blockchain for an opponent</Text>
  </View>
);
