import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

/**
 * CiBL Universal Icon Component
 * This component automatically applies the current theme's primary color
 */
export const CiBLIcon = ({ name, size = 24, color, strokeWidth = 2, ...props }) => {
  const { theme } = useTheme();
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    console.warn(`Icon ${name} not found in Lucide library`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color || theme.primary} // Defaults to current theme color
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};

// Icon Mapping for quick reference across the app
export const ICONS = {
  // Navigation
  HOME: 'Home',
  WALLET: 'Wallet',
  CHAT: 'MessageSquareCode',
  SETTINGS: 'Settings',
  
  // Transactions
  SEND: 'ArrowUpRight',
  RECEIVE: 'ArrowDownLeft',
  SWAP: 'RefreshCw',
  FAST_PAY: 'Zap',
  
  // Security
  BIOMETRIC: 'Fingerprint',
  SECURITY: 'ShieldCheck',
  KEYS: 'KeyRound',
  SHOW_BALANCE: 'Eye',
  HIDE_BALANCE: 'EyeOff',
  
  // Status
  SUCCESS: 'CircleCheckBig',
  ERROR: 'CircleAlert',
  NETWORK: 'Globe'
};

import { CiBLIcon, ICONS } from '../utils/Icons';

const Dashboard = () => {
  return (
    <View>
      {/* آیکون ارسال با رنگ خودکار تم */}
      <CiBLIcon name={ICONS.SEND} size={30} />
      
      {/* آیکون چت مخصوص CiBL */}
      <CiBLIcon name={ICONS.CHAT} />
      
      {/* اگر بخواهی در جای خاصی رنگ را دستی تغییر دهی */}
      <CiBLIcon name={ICONS.ERROR} color="#ff4444" />
    </View>
  );
};
