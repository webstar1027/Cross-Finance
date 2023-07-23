import tokens from './tokens'
import {
  PoolConfig,
  // PoolCategory
} from './types'

const pools: PoolConfig[] = [
  {
    pid: 0,
    lpSymbol: 'CRSS',
    lpAddresses: {
      56: tokens.crss.address[56],
      97: tokens.crss.address[97],
    },
    token: tokens.crss,
    quoteToken: tokens.crss,
  },
]

export default pools
