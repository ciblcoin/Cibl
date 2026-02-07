import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * ارسال پیام جدید به چت عمومی
 * @param {string} content - متن پیام (حداکثر ۳۰۰ کاراکتر)
 * @param {object} user - اطلاعات کاربر (id, username)
 * @param {boolean} isChallenge - آیا این پیام یک دعوت به چالش است؟
 */
export const sendMessage = async (content, user, isChallenge = false, challengeId = null) => {
  if (content.length > 300) {
    throw new Error("Message is too long (max 300 chars)");
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([
      { 
        content, 
        user_id: user.id, 
        username: user.username,
        is_challenge: isChallenge,
        challenge_id: challengeId
      }
    ]);

  if (error) throw error;
  return data;
};

/**
 * دریافت پیام‌های قدیمی (History)
 */
export const fetchMessages = async (limit = 50) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data.reverse();
};
