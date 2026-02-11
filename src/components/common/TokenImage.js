import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TokenImage = ({ uri, name, size = 40 }) => {
  const [error, setError] = useState(false);

  // تابع تولید رنگ رندوم اما ثابت بر اساس نام توکن
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 65%, 50%)`;
    return color;
  };

  if (!uri || error) {
    return (
      <View style={[styles.placeholder, { 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        backgroundColor: stringToColor(name || 'Token') 
      }]}>
        <Text style={[styles.text, { fontSize: size / 2.5 }]}>
          {name ? name.charAt(0).toUpperCase() : '?'}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      onError={() => setError(true)}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TokenImage;
{
  "symbol": "PYTH",
  "name": "Pyth Network",
  "thumbnail": "https://assets.coingecko.com/coins/images/31924/small/pyth.png",
  "balance": "100.0"
}
