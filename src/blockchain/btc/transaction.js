import axios from 'axios';
import { BTC_CONFIG } from './config';

export const fetchUtxos = async (address) => {
  const response = await axios.get(`${BTC_CONFIG.API_URL}/address/${address}/utxo`);
  return response.data;
};

export const broadcastTx = async (hex) => {
  const response = await axios.post(`${BTC_CONFIG.API_URL}/tx`, hex);
  return response.data; // Transaction ID
};
