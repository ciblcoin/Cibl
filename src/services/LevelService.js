import SoundManager from '../utils/SoundManager';

class LevelService {
  static calculateLevel(xp) {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }

  static getXPForNextLevel(currentLevel) {
    return Math.pow(currentLevel, 2) * 100;
  }

  /**
   * بررسی دریافت نشان‌های افتخار جدید
   */
  static checkNewBadges(userStats) {
    const newBadges = [];
    if (userStats.wins_count >= 10) newBadges.push({ id: 'warrior', label: 'Warrior', icon: '⚔️' });
    if (userStats.total_volume >= 1000) newBadges.push({ id: 'whale', label: 'Young Whale', icon: '🐋' });
    if (userStats.referral_count >= 5) newBadges.push({ id: 'leader', label: 'Leader', icon: '👑' });
    
    return newBadges;
  }
}

export default LevelService;
const handleLevelUp = (newLevel) => {
  // ۱. پخش صدای خاص (باید به SoundManager اضافه شود)
  SoundManager.playEffect('LEVEL_UP'); 
  
  // ۲. نمایش نوتیفیکیشن یا مدال تمام صفحه
  Alert.alert(
    "LEVEL UP! 🚀",
    `Congratulations! You've reached Level ${newLevel}. Your neon profile glow has increased!`,
    [{ text: "Awesome!" }]
  );
};
