export const providerJs = `
(function() {
  // شبیه‌سازی ولت سولانا (Phantom-like)
  window.solana = {
    isCiBL: true,
    publicKey: null,
    isConnected: false,
    connect: async function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({type: 'connect_solana'}));
      return { publicKey: window.solana.publicKey };
    },
    signTransaction: async function(tx) {
      window.ReactNativeWebView.postMessage(JSON.stringify({type: 'sign_tx_solana', tx: tx}));
    }
  };

  // شبیه‌سازی ولت اتریوم (MetaMask-like)
  window.ethereum = {
    isCiBL: true,
    request: async function(args) {
      window.ReactNativeWebView.postMessage(JSON.stringify({type: 'eth_request', method: args.method, params: args.params}));
    },
    on: function(event, callback) {
      console.log('Event listener added:', event);
    }
  };

  console.log('CiBL Multi-Chain Providers Injected!');
})();
`;
