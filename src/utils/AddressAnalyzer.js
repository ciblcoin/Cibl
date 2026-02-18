export const detectNetwork = (address) => {
  // ۱. بررسی شبکه‌های EVM (HyperEVM, Polygon, Avalanche, Ethereum)
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { 
      type: 'EVM', 
      networks: ['HyperEVM', 'Polygon', 'Avalanche'],
      msg: 'EVM compatible address detected.' 
    };
  }

  // ۲. بررسی شبکه ترون (Tron) - شروع با T
  if (/^T[A-Za-z1-9]{33}$/.test(address)) {
    return { type: 'TRON', networks: ['Tron'], msg: 'Tron (TRC-20) address detected.' };
  }

  // ۳. بررسی بیت‌کوین کش (BCH)
  if (/^([qp][a-z0-9]{41})|((bitcoincash:)?q[a-z0-9]{41})$/.test(address)) {
    return { type: 'BCH', networks: ['Bitcoin Cash'], msg: 'BCH address detected.' };
  }

  // ۴. بررسی کاردانو (Cardano)
  if (/^addr1[a-z0-9]+$/.test(address)) {
    return { type: 'CARDANO', networks: ['Cardano'], msg: 'Cardano (Shelley) address detected.' };
  }

  // ۵. بررسی پولکادات (Polkadot)
  if (/^[1-9][A-HJ-NP-Za-km-z1-9]+$/.test(address) && address.length >= 47) {
    return { type: 'DOT', networks: ['Polkadot'], msg: 'Polkadot address detected.' };
  }

  return { type: 'UNKNOWN', networks: [], msg: 'Invalid or unsupported address.' };
};
