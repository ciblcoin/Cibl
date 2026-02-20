import React from 'react';
import { View, StyleSheet } from 'react-native';
import Blockies from 'react-native-blockies-svg';
import { useTheme } from '../context/ThemeContext';

const CiblAvatar = ({ address, size = 80 }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { 
      width: size, 
      height: size, 
      borderColor: theme.primary,
      shadowColor: theme.primary 
    }]}>
      <Blockies
        address={address || "0x0000000000000000000000000000000000000000"}
        size={8} // تعداد پیکسل‌ها در هر ردیف
        scale={size / 8} // مقیاس‌دهی برای پر کردن دایره
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  }
});

export default CiblAvatar;
