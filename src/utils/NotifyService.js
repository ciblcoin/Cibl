import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// تنظیم نحوه نمایش اعلان وقتی اپلیکیشن باز است
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const NotifyService = {
  // ۱. گرفتن توکن و اجازه از کاربر
  registerForPushNotifications: async () => {
    if (!Device.isDevice) return;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') return;

    // تنظیم کانال مخصوص اندروید (برای درخشش و صدا)
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('cibl-alerts', {
        name: 'CiBL Alerts',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#06b6d4', // نور آبی نئونی
      });
    }
  },

  // ۲. ارسال اعلان موفقیت تراکنش
  sendTxSuccess: async (amount, symbol) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⚡ TRANSACTION SECURED",
        body: `Successfully sent ${amount} ${symbol}. The block has been confirmed.`,
        data: { screen: 'Assets' },
        sound: 'default', 
      },
      trigger: null, // ارسال آنی
    });
  }
};
