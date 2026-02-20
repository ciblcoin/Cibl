import React, { createContext, useState, useContext } from 'react';

const NetworkContext = createContext();

export const NETWORKS = {
  MAINNET: { id: 'mainnet', name: 'PRODUCTION_CORE', rpc: 'https://eth-mainnet...', color: '#00FF41' },
  TESTNET: { id: 'testnet', name: 'SANDBOX_NODE', rpc: 'https://eth-goerli...', color: '#FFD700' },
  CIBL_CHAIN: { id: 'cibl', name: 'CIBL_PROTOCOL', rpc: 'https://rpc.cibl...', color: '#00D1FF' }
};

export const NetworkProvider = ({ children }) => {
  const [currentNetwork, setCurrentNetwork] = useState(NETWORKS.MAINNET);

  return (
    <NetworkContext.Provider value={{ currentNetwork, setCurrentNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
