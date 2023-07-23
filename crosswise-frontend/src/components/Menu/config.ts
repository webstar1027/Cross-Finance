import { MenuEntry } from '@crosswiselabs/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: '/exchange',
        icon: 'DexIcon',
      },
      {
        label: 'Liquidity',
        href: '/liquidity',
        icon: 'LiquidityIcon',
      },
    ],
  },
  {
    label: 'Earn',
    icon: 'FarmIcon',
    items: [
      {
        label: 'Space Farms',
        href: '/farms',
        icon: 'FarmIcon',
      },
      {
        label: 'Solar Pools',
        href: '/pools',
        icon: 'PoolIcon',
      },
      {
        label: 'Moonwalkers',
        icon: 'ReferralsIcon',
        href: '/moonwalkers',
      },
    ],
  },

  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      // {
      //   label: 'Team',
      //   icon: 'TeamPlayerIcon',
      //   href: '/teams',
      // },
      {
        label: 'CrossDocs',
        href: 'https://crosswise.gitbook.io/crosswise-docs/general/master',
        icon: 'CrssDocsIcon',
      },
      {
        label: 'Blog',
        icon: 'CommentIcon',
        href: 'https://crosswise.medium.com',
      },
    ],
  },
]

export default config
