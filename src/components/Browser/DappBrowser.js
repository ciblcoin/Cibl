import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { providerJs } from '../utils/providerJs';

export default function DappBrowser({ url, userAddresses }) {
  const webViewRef = useRef(null);

  // مدیریت درخواست‌های سایت (مثلاً درخواست اتصال یا امضا)
  const onMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === 'connect_solana') {
      // نمایش یک مودال به کاربر: "آیا اجازه می‌دهید این سایت به ولت وصل شود؟"
      // اگر تایید کرد، آدرس را به سایت برمی‌گردانیم:
      const response = `
        window.solana.publicKey = "${userAddresses.solana}";
        window.solana.isConnected = true;
        window.solana.dispatchEvent(new Event('connect'));
      `;
      webViewRef.current.injectJavaScript(response);
    }
    
    if (data.type === 'eth_request' && data.method === 'eth_requestAccounts') {
      const response = `
        window.ethereum.selectedAddress = "${userAddresses.evm}";
        window.dispatchEvent(new Event('ethereum#initialized'));
      `;
      webViewRef.current.injectJavaScript(response);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: url }}
      injectedJavaScript={providerJs} // تزریق کد در لحظه لود شدن
      onMessage={onMessage} // گوش دادن به درخواست‌های dApp
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
}
