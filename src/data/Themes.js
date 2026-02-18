export const Themes = {
  // ۱. تم فیروزه‌ای نئونی (Cyberpunk)
  cyan: {
    id: 'cyan',
    primary: '#06b6d4',
    secondary: '#0891b2',
    background: '#000000',
    card: '#0F172A',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
    glow: 'rgba(6, 182, 212, 0.4)',
    border: '#06b6d433'
  },
  // ۲. تم ارغوانی (Synthwave)
  purple: {
    id: 'purple',
    primary: '#D946EF',
    secondary: '#A21CAF',
    background: '#0F0716',
    card: '#1E1029',
    text: '#FFFFFF',
    textMuted: '#A78BFA',
    glow: 'rgba(217, 70, 239, 0.4)',
    border: '#D946EF33'
  },
  // ۳. تم تیره مطلق (Deep Dark - کلاسیک)
  dark: {
    id: 'dark',
    primary: '#F8FAFC', // سفید مایل به آبی برای المان‌های اصلی
    secondary: '#94A3B8',
    background: '#020617', // مشکی بسیار عمیق
    card: '#111827',
    text: '#FFFFFF',
    textMuted: '#64748B',
    glow: 'rgba(248, 250, 252, 0.1)',
    border: '#334155'
  },
  // ۴. تم روشن (Pure Light - روزانه)
  light: {
    id: 'light',
    primary: '#0F172A', // مشکی برای دکمه‌ها و المان‌های اصلی
    secondary: '#475569',
    background: '#F1F5F9', // خاکستری بسیار روشن/سفید
    card: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#64748B',
    glow: 'rgba(15, 23, 42, 0.05)',
    border: '#E2E8F0'
  }
};
import * as Haptics from 'expo-haptics';

export const Themes = {
  cyan: {
    // ... تنظیمات قبلی ...
    hapticType: Haptics.ImpactFeedbackStyle.Heavy, // لرزش قوی دیجیتالی
    sound: require('../../assets/sounds/neon-click.mp3'),
  },
  purple: {
    // ... تنظیمات قبلی ...
    hapticType: Haptics.ImpactFeedbackStyle.Medium, // لرزش متوسط سینتی‌سایزری
    sound: require('../../assets/sounds/synth-click.mp3'),
  },
  dark: {
    // ... تنظیمات قبلی ...
    hapticType: Haptics.ImpactFeedbackStyle.Light, // لرزش بسیار نرم و کلاسیک
    sound: require('../../assets/sounds/dark-click.mp3'),
  },
  light: {
    // ... تنظیمات قبلی ...
    hapticType: Haptics.ImpactFeedbackStyle.Light, // لرزش کوتاه شبیه کلیک فیزیکی
    sound: require('../../assets/sounds/light-tap.mp3'),
  }
};

import * as Haptics from 'expo-haptics';

export const Themes = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Neon',
    primary: '#06b6d4',
    secondary: '#0891b2',
    background: '#000000',
    card: '#0F172A',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
    glow: 'rgba(6, 182, 212, 0.4)',
    border: '#06b6d433',
    hapticType: Haptics.ImpactFeedbackStyle.Heavy,
    sound: require('../../assets/sounds/neon-click.mp3'),
  },
  purple: {
    id: 'purple',
    name: 'Synthwave',
    primary: '#D946EF',
    secondary: '#A21CAF',
    background: '#0F0716',
    card: '#1E1029',
    text: '#FFFFFF',
    textMuted: '#A78BFA',
    glow: 'rgba(217, 70, 239, 0.4)',
    border: '#D946EF33',
    hapticType: Haptics.ImpactFeedbackStyle.Medium,
    sound: require('../../assets/sounds/synth-click.mp3'),
  },
  dark: {
    id: 'dark',
    name: 'Deep Ocean',
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    background: '#020617',
    card: '#111827',
    text: '#FFFFFF',
    textMuted: '#64748B',
    glow: 'rgba(248, 250, 252, 0.1)',
    border: '#334155',
    hapticType: Haptics.ImpactFeedbackStyle.Light,
    sound: require('../../assets/sounds/dark-click.mp3'),
  },
  light: {
    id: 'light',
    name: 'Pure Light',
    primary: '#0F172A',
    secondary: '#475569',
    background: '#F1F5F9',
    card: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#64748B',
    glow: 'rgba(15, 23, 42, 0.05)',
    border: '#E2E8F0',
    hapticType: Haptics.ImpactFeedbackStyle.Light,
    sound: require('../../assets/sounds/light-tap.mp3'),
  }
};
