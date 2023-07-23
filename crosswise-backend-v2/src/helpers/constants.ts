export type T_CROSSWISE_NETWORK_ID = 97 | 137;
export const chainId: T_CROSSWISE_NETWORK_ID = 97;

export const CROSSWISE_NETWORKS: {
  [networkId in T_CROSSWISE_NETWORK_ID]: { name: string; rpc: string };
} = {
  '97': { name: 'bsc_testnet', rpc: 'bsc_testnet_chapel' },
  '137': { name: 'polygon', rpc: 'polygon' },
};

export const CROSSWISE_NETWORK = CROSSWISE_NETWORKS[chainId];

export const HTTP_RPC_URL = `https://rpc.ankr.com/${CROSSWISE_NETWORK.rpc}`;

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const CROSSWISE_REFERRAL_ADDRESS = {
  '97': '0x0994b94996d40e6bd82fd8d9033d83e95c795e77',
  '137': '0x0994b94996d40e6bd82fd8d9033d83e95c795e77',
}[chainId];
