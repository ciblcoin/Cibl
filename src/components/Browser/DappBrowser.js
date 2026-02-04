// ساختار ساده مرورگر در src/components/Browser/DappBrowser.js
export function DappBrowser({ url }) {
  return (
    <View style={{flex: 1}}>
      <TextInput placeholder="Enter URL (e.g. raydium.io)" />
      <WebView 
        source={{ uri: url }}
        injectedJavaScript={window.solana = { isCiBL: true, connect: ... }} 
      />
    </View>
  );
}
