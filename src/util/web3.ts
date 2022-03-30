import { ethers } from 'ethers';

export const getSigner = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum!);
  // MetaMask requires requesting permission to connect users accounts
  await provider.send('eth_requestAccounts', []);
  return provider.getSigner();
};

export const getWalletAddress = async () => {
  const s = await getSigner();
  const address = await s.getAddress();
  return address;
};
