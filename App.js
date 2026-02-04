import React, { useCallback, useEffect, useState } from 'react';
import { View, LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Icon Library
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  MessageCircle, 
  History, 
  Settings 
} from 'lucide-react-native';

// Import Custom Services
import { NotificationService } from './src/services/notificationService';
import { supabase } from './src/services/supabaseClient';

// Import Screens
import MainDashboard from './src/screens/main/MainDashboard';
import TokenDetailScreen from './src/screens/trade/TokenDetailScreen';
import SwapScreen from './src/screens/trade/SwapScreen';
import ActivityFeed from './src/screens/main/ActivityFeed';
import ChatScreen from './src/screens/main/ChatScreen';
import SettingsScreen from './src/screens/main/SettingsScreen';

// Ignore specific warnings for a cleaner console in production
LogBox.ignoreLogs(['Setting a timer']);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- BOTTOM TAB NAVIGATION CONFIGURATION ---
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#0A0E17', 
          borderTopColor: '#161B28', 
          height: 90, 
          paddingBottom: 25,
          paddingTop: 10
        },
        tabBarActiveTintColor: '#FFD700', // CiBL Gold
        tabBarInactiveTintColor: '#475569', // Slate Gray
        tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
      }}
    >
      <Tab.Screen 
        name="Wallet" 
        component={MainDashboard} 
        options={{ 
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} size={24} /> 
        }} 
      />
      <Tab.Screen 
        name="Swap" 
        component={SwapScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <ArrowLeftRight color={color} size={24} /> 
        }} 
      />
      <Tab.Screen 
        name="GambleFi" 
        component={ChatScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={24} /> 
        }} 
      />
      <Tab.Screen 
        name="Activity" 
        component={ActivityFeed} 
        options={{ 
          tabBarIcon: ({ color }) => <History color={color} size={24} /> 
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <Settings color={color} size={24} /> 
        }} 
      />
    </Tab.Navigator>
  );
}

// --- MAIN APP ENTRY POINT ---
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // 1. Prevent splash screen from hiding automatically
        await SplashScreen.preventAutoHideAsync();

        // 2. Load Global Assets & Fonts
        await Font.loadAsync({
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
          'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
          'SpaceMono-Regular': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });

        // 3. Initialize Push Notifications
        const pushToken = await NotificationService.registerForPushNotifications();
        if (pushToken) {
          console.log("Push Notification Token Ready:", pushToken);
        }

        // 4. Initial Database Ping (Optional check for Supabase connectivity)
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        if (error) console.error("Supabase Connectivity Error:", error.message);

      } catch (e) {
        console.warn("Initialization Error:", e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately!
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0E17' }} onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            animation: 'slide_from_right'
          }}
        >
          {/* Main App Flow with Bottom Tabs */}
          <Stack.Screen name="MainRoot" component={MainTabs} />
          
          {/* High-Level Screens (Opened on top of everything) */}
          <Stack.Screen 
            name="TokenDetail" 
            component={TokenDetailScreen} 
            options={{ 
              presentation: 'modal', // Modern slide-up card on iOS
              animation: 'slide_from_bottom' 
            }} 
          />
          
          {/* Here you can add more full-screen views like "TransactionSuccess" or "ReferralDetails" */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
