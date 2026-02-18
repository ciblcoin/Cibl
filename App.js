import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Text, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MotiView, AnimatePresence } from 'moti';
import { Feather } from '@expo/vector-icons';


// App.js - THE ULTIMATE NEON EDITION
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// کامپوننت‌های وارد شده (که قبلاً ساختیم)
import SoundManager from './src/utils/SoundManager';
import NeonToast from './src/components/NeonToast';
import TotalBalance from './src/components/TotalBalance';
import NetworkScroller from './src/components/NetworkScroller';
import SwapScreen from './src/screens/SwapScreen';
import CombatChat from './src/screens/CombatChat';
import Marketplace from './src/screens/Marketplace';
import NftGallery from './src/screens/NftGallery';
import SecurityVault from './src/components/SecurityVault';

export default function App() {
  const [activeTab, setActiveTab] = useState('wallet');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    SoundManager.init().then(() => {
      SoundManager.play('AUTH');
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar barStyle="light-content" />
        
        {/* بدنه اصلی بر اساس تب فعال */}
        <View className="flex-1">
          {activeTab === 'wallet' && <View className="flex-1"><TotalBalance totalValue={9450.75} currencyCode="USD" /><NetworkScroller onSelect={() => SoundManager.play('NEON_TICK')} /></View>}
          {activeTab === 'swap' && <SwapScreen />}
          {activeTab === 'chat' && <CombatChat />}
          {activeTab === 'market' && <Marketplace />}
          {activeTab === 'nfts' && <NftGallery onClose={() => setActiveTab('wallet')} />}
        </View>

        {/* نوار ابزار نئونی (TabBar) */}
        <View className="absolute bottom-6 left-4 right-4 h-20 bg-slate-900/95 border border-slate-800 rounded-[35px] flex-row justify-around items-center px-2">
          <TabButton icon="wallet" isActive={activeTab === 'wallet'} onPress={() => {setActiveTab('wallet'); SoundManager.play('NEON_TICK');}} />
          <TabButton icon="image" isActive={activeTab === 'nfts'} onPress={() => {setActiveTab('nfts'); SoundManager.play('NAV_SWOOSH');}} />
          
          {/* دکمه مرکزی شناور سوآپ */}
          <TouchableOpacity 
            onPress={() => {setActiveTab('swap'); SoundManager.play('TX_CHARGE');}}
            className="bg-cyan-500 w-16 h-16 rounded-full -top-6 items-center justify-center shadow-lg shadow-cyan-500"
          >
            <Feather name="repeat" size={28} color="black" />
          </TouchableOpacity>

          <TabButton icon="shopping-bag" isActive={activeTab === 'market'} onPress={() => {setActiveTab('market'); SoundManager.play('NOTIFY');}} />
          <TabButton icon="message-square" isActive={activeTab === 'chat'} onPress={() => {setActiveTab('chat'); SoundManager.play('SWORD');}} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}




// --- ابزارها و مدیریت صدا ---
import SoundManager from './src/utils/SoundManager';
import { EVM_CONFIG } from './src/blockchain/evm/config';

// --- کامپوننت‌های بخش‌های مختلف ---
import TotalBalance from './src/components/TotalBalance';
import NetworkScroller from './src/components/NetworkScroller';
import PortfolioChart from './src/components/PortfolioChart';
import TokenAssetsList from './src/components/TokenAssetsList';
import FlyOutEffect from './src/components/FlyOutEffect';
import CombatChat from './src/screens/CombatChat'; 
import NftGallery from './src/screens/NftGallery';
import StakingVault from './src/components/StakingVault';
import SecurityVault from './src/components/SecurityVault';
import SwapScreen from './src/screens/SwapScreen'; // بخش جدید سوآپ

const { width } = Dimensions.get('window');

export default function App() {
  // --- استیت‌های مدیریتی ---
  const [activeTab, setActiveTab] = useState('wallet');
  const [selectedNetwork, setSelectedNetwork] = useState('ALL');
  const [isLoaded, setIsLoaded] = useState(false);

  // --- راه‌اندازی سیستم نئونی ---
  useEffect(() => {
    const startCiBL = async () => {
      await SoundManager.init();
      SoundManager.play('AUTH'); // صدای ورود امنیتی
      setIsLoaded(true);
    };
    startCiBL();
  }, []);

  if (!isLoaded) return null;

  // تابع تغییر تب با افکت صوتی اختصاصی
  const changeTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'wallet') SoundManager.play('NEON_TICK');
    if (tab === 'swap') SoundManager.play('TX_CHARGE'); // صدای شارژ برای سوآپ
    if (tab === 'chat') SoundManager.play('SWORD');
    if (tab === 'nfts') SoundManager.play('NAV_SWOOSH');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar barStyle="light-content" />
        
        {/* افکت بصری پرتاب تراکنش */}
        <FlyOutEffect isVisible={false} color="#06b6d4" />

        <View className="flex-1">
          <AnimatePresence exitBeforeEnter>
            {/* ۱. ویوی کیف پول */}
            {activeTab === 'wallet' && (
              <MotiView from={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} key="wallet">
                <ScrollView showsVerticalScrollIndicator={false} className="mb-24">
                  <TotalBalance totalValue={9450.75} currencyCode="USD" />
                  <NetworkScroller activeNet={selectedNetwork} onSelect={setSelectedNetwork} />
                  <PortfolioChart color={EVM_CONFIG[selectedNetwork]?.color || '#06b6d4'} />
                  <TokenAssetsList filterNetwork={selectedNetwork} />
                </ScrollView>
              </MotiView>
            )}

            {/* ۲. ویوی سوآپ (بخش مرکزی) */}
            {activeTab === 'swap' && (
              <MotiView from={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} key="swap">
                <SwapScreen />
              </MotiView>
            )}

            {/* ۳. سایر بخش‌ها */}
            {activeTab === 'nfts' && <NftGallery key="nfts" onClose={() => setActiveTab('wallet')} />}
            {activeTab === 'staking' && <StakingVault key="staking" asset="TON" apy={12.5} />}
            {activeTab === 'chat' && <CombatChat key="chat" />}
            {activeTab === 'security' && <SecurityVault key="security" />}
          </AnimatePresence>
        </View>

        {/* --- نوار ابزار نئونی نهایی با دکمه شناور سوآپ --- */}
        <View className="absolute bottom-8 left-4 right-4 h-20 bg-slate-900/90 border border-slate-800 rounded-[35px] flex-row justify-between items-center px-4 shadow-2xl shadow-cyan-500/20">
          
          <TabButton icon="wallet" isActive={activeTab === 'wallet'} onPress={() => changeTab('wallet')} />
          <TabButton icon="image" isActive={activeTab === 'nfts'} onPress={() => changeTab('nfts')} />

          {/* دکمه مرکزی شناور برای SWAP */}
          <TouchableOpacity 
            onPress={() => changeTab('swap')}
            style={{ 
              top: -30, 
              width: 70, height: 70, 
              borderRadius: 35, 
              backgroundColor: '#06b6d4',
              justifyContent: 'center', alignItems: 'center',
              borderWidth: 5, borderColor: '#000',
              shadowColor: '#06b6d4', shadowOffset: {width:0, height:10}, shadowOpacity: 0.5, shadowRadius: 15
            }}
          >
            <MotiView
              animate={{ rotate: activeTab === 'swap' ? '180deg' : '0deg' }}
              transition={{ type: 'spring' }}
            >
              <Feather name="repeat" size={28} color="black" />
            </MotiView>
          </TouchableOpacity>

          <TabButton icon="zap" isActive={activeTab === 'staking'} onPress={() => changeTab('staking')} />
          <TabButton icon="message-square" isActive={activeTab === 'chat'} onPress={() => changeTab('chat')} />

        </View>

        {/* دکمه کوچک امنیت در گوشه بالا برای دسترسی سریع */}
        <TouchableOpacity 
          onPress={() => changeTab('security')}
          className="absolute top-14 right-6 bg-slate-900/50 p-2 rounded-full border border-slate-800"
        >
          <Feather name="shield" size={20} color={activeTab === 'security' ? '#22d3ee' : '#475569'} />
        </TouchableOpacity>

      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// کامپوننت دکمه‌های تب‌بار
const TabButton = ({ icon, isActive, onPress }) => (
  <TouchableOpacity onPress={onPress} className="items-center justify-center w-12">
    <MotiView animate={{ scale: isActive ? 1.2 : 1, opacity: isActive ? 1 : 0.4 }}>
      <Feather name={icon} size={22} color={isActive ? '#22d3ee' : '#94a3b8'} />
    </MotiView>
    {isActive && <View className="w-1 h-1 bg-cyan-400 rounded-full mt-1" />}
  </TouchableOpacity>
);
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

// جلوگیری از مخفی شدن خودکار صفحه اسپلش
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // ۱. لود کردن فونت‌ها
        await Font.loadAsync({
          'Orbitron-Bold': require('./assets/fonts/Orbitron-Bold.ttf'),
          'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
        });

        // ۲. پیش‌بارگذاری تصاویر سنگین (WebP)
        await Asset.loadAsync([
          require('./assets/images/background-neon.webp'),
          require('./assets/icons/app-icon.png'),
        ]);

        // ۳. شبیه‌سازی لودینگ سیستم (اختیاری)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync(); // حالا صفحه اصلی را نشان بده
      }
    }

    prepare();
  }, []);

  if (!appIsReady) return null;

  return <MainNavigation />;
}
export default function App() {
  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);

  // منطق لود کردن دارایی‌ها (که قبلاً نوشتیم)
  useEffect(() => {
    prepareAssets().then(() => setAppIsReady(true));
  }, []);

  if (!appIsReady) return null; // نمایش اسپلش استاتیک اکسپو

  if (showAnimatedSplash) {
    return <AnimatedSplash onFinish={() => setShowAnimatedSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
// داخل useEffect در App.js
await FeedbackManager.loadAll();

{
  "expo": {
    "name": "CiBL Pro",
    "icon": "./assets/icons/ui/logo-cibl.svg", 
    "splash": {
      "image": "./assets/images/background-neon.webp",
      "resizeMode": "cover",
      "backgroundColor": "#000000"
    },
    "assetBundlePatterns": [
      "assets/**/*"
    ],
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icons/ui/logo-cibl.svg",
        "backgroundColor": "#000000"
      }
    }
  }
}

return (
  <BiometricGuard>
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  </BiometricGuard>
);


// در فایل ThemeContext.js یا مشابه آن
export const theme = {
  cyber: {
    primary: '#06b6d4', // Cyan
    glow: 'rgba(6, 182, 212, 0.5)',
  },
  matrix: {
    primary: '#00ff41', // Matrix Green
    glow: 'rgba(0, 255, 65, 0.5)',
  }
};


import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// وارد کردن سرویس‌ها و کامپوننت‌هایی که با هم ساختیم
import SecurityService from './src/utils/SecurityService';
import BiometricGuard from './src/components/BiometricGuard';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AssetsScreen from './src/screens/AssetsScreen';

// جلوگیری از نمایش هشدارهای غیرضروری در اپلیکیشن نهایی
LogBox.ignoreAllLogs();

// نگه داشتن اسپلش اسکرین تا لود شدن کامل منابع
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    async function prepare() {
      try {
        // ۱. لود کردن فونت‌های استاتیک (Orbitron و Cairo)
        await Font.loadAsync({
          'Orbitron-Bold': require('./assets/fonts/Orbitron-Bold.ttf'),
          'Orbitron-Regular': require('./assets/fonts/Orbitron-Regular.ttf'),
          'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
          'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),
        });

        // ۲. چک کردن وضعیت کاربر (آیا قبلاً کیف‌پول ساخته است؟)
        const hasWallet = await SecurityService.hasWallet();
        if (hasWallet) {
          setInitialRoute('MainApp');
        }

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // پنهان کردن اسپلش اسکرین وقتی همه چیز آماده است
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#000' }
          }}
        >
          {/* صفحه ورود برای کاربران جدید */}
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />

          {/* بخش اصلی اپلیکیشن محافظت شده با قفل بیومتریک */}
          <Stack.Screen name="MainApp">
            {props => (
              <BiometricGuard>
                <AssetsScreen {...props} />
              </BiometricGuard>
            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}



import React, { useState, useEffect, useCallback } from 'react';
import { View, LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Audio } from 'expo-av'; // برای مدیریت صداهای نئونی
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Wallet, MessageSquareCode, Shield, Zap } from 'lucide-react-native';

// --- سرویس‌ها و ابزارهای داخلی ---
import SecurityService from './src/utils/SecurityService';
import WalletEngine from './src/utils/WalletEngine';
import BiometricGuard from './src/components/BiometricGuard';

// --- صفحات اپلیکیشن ---
import OnboardingScreen from './src/screens/OnboardingScreen';
import AssetsScreen from './src/screens/AssetsScreen';
import CombatChatScreen from './src/screens/CombatChatScreen'; // بخش چت و چالش

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// --- بخش منوی پایینی (Main Tabs) ---
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#000', 
          borderTopColor: '#06b6d433', 
          height: 70, 
          paddingBottom: 10 
        },
        tabBarActiveTintColor: '#06b6d4',
        tabBarInactiveTintColor: '#475569',
      }}
    >
      <Tab.Screen 
        name="Wallet" 
        component={AssetsScreen} 
        options={{ tabBarIcon: ({color}) => <Wallet color={color} size={24} /> }}
      />
      <Tab.Screen 
        name="CombatChat" 
        component={CombatChatScreen} 
        options={{ 
          tabBarLabel: 'Chat',
          tabBarIcon: ({color}) => <MessageSquareCode color={color} size={24} /> 
        }}
      />
      <Tab.Screen 
        name="Security" 
        component={View} // صفحه تنظیمات امنیتی
        options={{ tabBarIcon: ({color}) => <Shield color={color} size={24} /> }}
      />
    </Tab.Navigator>
  );
}

// --- کامپوننت اصلی App ---
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    async function prepare() {
      try {
        // ۱. لود کردن فونت‌های نهایی (Static)
        await Font.loadAsync({
          'Orbitron-Bold': require('./assets/fonts/Orbitron-Bold.ttf'),
          'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
        });

        // ۲. تنظیمات صدا (Audio)
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

        // ۳. بررسی وضعیت کیف‌پول در بلاک‌چین
        const hasWallet = await SecurityService.hasWallet();
        if (hasWallet) {
          setInitialRoute('MainApp');
        }

      } catch (e) {
        console.error("Initialization Error:", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          {/* مسیر ورود اول: Onboarding */}
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />

          {/* مسیر اصلی: محافظت شده با لایه بیومتریک و شامل تب‌بار */}
          <Stack.Screen name="MainApp">
            {props => (
              <BiometricGuard>
                <MainTabNavigator {...props} />
              </BiometricGuard>
            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
import { NotifyService } from './src/utils/NotifyService';

useEffect(() => {
  NotifyService.registerForPushNotifications();
}, []);

import LogoCibl from './assets/logo-cibl.svg';

// در صفحه Splash یا Dashboard
<LogoCibl width={120} height={120} />

import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <MainNavigation />
    </ThemeProvider>
  );
}

const RootNavigation = () => {
  const { theme, loading } = useTheme();

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />; // یا اسپلش اسکرین
  }

  return (
    <NavigationContainer>
      {/* استک‌های شما */}
    </NavigationContainer>
  );
};


import { StatusBar } from 'expo-status-bar';

const MainApp = () => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* اگر تم لایت بود، آیکون‌های استاتوس بار تیره شوند */}
      <StatusBar style={theme.id === 'light' ? 'dark' : 'light'} />
      <Navigation />
    </View>
  );
};

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { NotifyService } from './src/utils/NotifyService';
import MainNavigation from './src/navigation/MainNavigation'; // Your Nav Stack

const CiBLApp = () => {
  const { theme, isThemeLoading } = useTheme();

  useEffect(() => {
    // Initialize Push Notifications
    NotifyService.registerForPushNotifications();
  }, []);

  if (isThemeLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar style={theme.id === 'light' ? 'dark' : 'light'} />
      <MainNavigation />
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CiBLApp />
    </ThemeProvider>
  );
}
