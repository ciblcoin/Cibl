import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

// کدهای SVG که در مرحله قبل به شما دادم را در یک فایل ثابت نگه می‌داریم
import { SVG_DATA } from '../constants/networkIcons'; 

const NetworkIcon = ({ name, size = 40, glow = true }) => {
  const xml = SVG_DATA[name]; // دریافت کد XML بر اساس نام شبکه
  
  if (!xml) return null;

  return (
    <View style={{
      width: size,
      height: size,
      // ایجاد درخشش نئونی در پشت آیکون
      shadowColor: glow ? '#06b6d4' : 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: glow ? 5 : 0,
    }}>
      <SvgXml xml={xml} width={size} height={size} />
    </View>
  );
};

export default NetworkIcon;
