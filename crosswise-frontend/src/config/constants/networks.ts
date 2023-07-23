import { ChainId } from '@crosswise/sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'https://rpc.ankr.com/bsc',
  [ChainId.TESTNET]: 'https://rpc.ankr.com/bsc_testnet_chapel',
}

export default NETWORK_URLS

export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
