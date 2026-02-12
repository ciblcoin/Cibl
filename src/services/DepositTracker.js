import { notifyDeposit } from '../utils/NotificationManager';
import SoundManager from '../utils/SoundManager';

export const startDepositTracker = (userAddresses) => {
  
  // ۱. ردیاب شبکه TON (با استفاده از TonAPI یا TonCenter)
  const tonSocket = new WebSocket('wss://tonapi.io/v2/websocket');
  
  tonSocket.onopen = () => {
    tonSocket.send(JSON.stringify({
      subscribe_account: userAddresses.ton
    }));
  };

  tonSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'account_update') {
      // پخش صدای واریز و ناتیفیکیشن
      notifyDeposit(data.amount, 'TON');
      SoundManager.play('TX_SUCCESS');
    }
  };

  // ۲. ردیاب شبکه Solana
  // استفاده از connection.onAccountChange در @solana/web3.js
};
