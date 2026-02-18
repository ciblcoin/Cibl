import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* تصویر پس‌زمینه که قبلاً طراحی کردیم */}
      <ImageBackground
        source={require('../../assets/images/onboarding.webp')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* لایه گرادینت تیره برای خوانایی متن */}
        <View style={styles.overlay}>
          
          <View style={styles.content}>
            {/* عنوان اپلیکیشن با انیمیشن */}
            <MotiText
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 300, type: 'timing', duration: 1000 }}
              style={styles.title}
            >
              CiBL WALLET
            </MotiText>

            {/* شعار تبلیغاتی */}
            <MotiText
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 800, duration: 1000 }}
              style={styles.subtitle}
            >
              Experience the Neon Reality of Assets. Secure. Global. Instant.
            </MotiText>

            {/* دکمه ورود درخشان */}
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1200, type: 'spring' }}
              style={styles.buttonContainer}
            >
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => navigation.replace('MainApp')}
                style={styles.button}
              >
                <Text style={styles.buttonText}>START YOUR JOURNEY</Text>
                <View style={styles.iconCircle}>
                  <ChevronRight color="#000" size={20} />
                </View>
              </TouchableOpacity>
            </MotiView>

            {/* فوتر کوچک */}
            <Text style={styles.footerText}>
              Powered by Quantum Blockchain Technology
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  content: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontFamily: 'Orbitron-Bold',
    color: '#06b6d4',
    textAlign: 'center',
    textShadowColor: 'rgba(6, 182, 212, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    fontFamily: 'Cairo-Bold',
    marginTop: 15,
    lineHeight: 24,
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#06b6d4',
    borderRadius: 20,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  buttonText: {
    color: '#06b6d4',
    fontFamily: 'Orbitron-Bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  iconCircle: {
    backgroundColor: '#06b6d4',
    width: 35,
    height: 35,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#444',
    fontSize: 10,
    fontFamily: 'Orbitron-Bold',
    marginTop: 30,
    letterSpacing: 2,
  }
});

export default OnboardingScreen;
