import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { PROVIDER_JS } from '../bridge/ProviderInjectedScript';
import { KeyManager } from '../core/KeyManager';

const DAppBrowser = ({ url }) => {
  const webViewRef = useRef(null);

  const handleMessage = async (event) => {
    const request = JSON.parse(event.nativeEvent.data);
    
    // مدیریت درخواست‌های DApp
    if (request.method === 'eth_requestAccounts') {
      const { address } = await KeyManager.derivePrivateKey('ETH');
      
      // بازگرداندن آدرس به سایت
      const response = JSON.stringify({ type: 'message_response', detail: [address] });
      webViewRef.current.injectJavaScript(`window.dispatchEvent(new CustomEvent('message_response', {detail: ${response}}))`);
      
      SoundManager.play('AUTH'); // صدای اتصال موفق
    }
    
    if (request.method === 'eth_sendTransaction') {
        // باز شدن یک Modal نئونی برای تایید تراکنش توسط کاربر
        // و سپس امضا با استفاده از TransactionManager
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: url }}
      injectedJavaScript={PROVIDER_JS}
      onMessage={handleMessage}
      style={{ flex: 1, backgroundColor: '#000' }}
    />
  );
};
