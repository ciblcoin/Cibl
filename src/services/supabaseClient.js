import { createClient } from '@supabase/supabase-js';

// These variables should be in your .env file for security
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const DatabaseService = {
  /**
   * Create or update user profile
   */
  async updateProfile(walletAddress, username, referralCode) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ 
        wallet_address: walletAddress, 
        username: username,
        referral_code: referralCode,
        last_seen: new Date() 
      });
    
    if (error) throw error;
    return data;
  },

  /**
   * Log a challenge result for the leaderboard
   */
  async logChallengeResult(winnerAddress, loserAddress, stakeAmount, roomId) {
    const { data, error } = await supabase
      .from('challenges')
      .insert([
        { 
          winner: winnerAddress, 
          loser: loserAddress, 
          amount: stakeAmount, 
          room_id: roomId,
          timestamp: new Date()
        }
      ]);
    
    if (error) throw error;
    return data;
  },

  /**
   * Get Leaderboard for GambleFi section
   */
  async getLeaderboard() {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, wins, total_earned')
      .order('total_earned', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data;
  }
};
