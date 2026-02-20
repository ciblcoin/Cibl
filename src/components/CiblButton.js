import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { InteractionService } from '../utils/InteractionService';

/**
 * CiBL Primary Button Component
 * @param {string} title - The text on the button
 * @param {function} onPress - Action on click
 * @param {boolean} loading - Shows a loader instead of text
 * @param {boolean} disabled - Disables the button
 * @param {object} style - Custom override styles
 * @param {string} variant - 'primary' or 'outline'
 */
const CiblButton = ({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false, 
  style, 
  variant = 'primary' 
}) => {
  const { theme } = useTheme();

  const handlePress = () => {
    if (disabled || loading) return;

    // ۱. پخش خودکار لرزش و صدا بر اساس تم فعال
    InteractionService.playInteraction(theme);

    // ۲. اجرای دستور اصلی دکمه
    if (onPress) onPress();
  };

  // استایل‌های پویا بر اساس تم و نوع (Variant)
  const isOutline = variant === 'outline';
  
  const buttonStyle = [
    styles.button,
    {
      backgroundColor: isOutline ? 'transparent' : theme.primary,
      borderColor: theme.primary,
      shadowColor: theme.primary,
    },
    disabled && { opacity: 0.5, borderColor: theme.textMuted },
    style
  ];

  const textStyle = [
    styles.text,
    { color: isOutline ? theme.primary : (theme.id === 'light' ? '#FFF' : '#000') }
  ];

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      activeOpacity={0.7} 
      style={buttonStyle}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={textStyle[1].color} />
      ) : (
        <Text style={textStyle}>{title.toUpperCase()}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 55,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    // افکت درخشش نئونی (فقط روی تم‌های تیره)
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    fontFamily: 'Orbitron-Bold',
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default CiblButton;
