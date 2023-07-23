import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Crosswise.Finance',
  description:
    'Crosswise.Finance takes the trading experience on DEX to the next level with tighter security, a friendly interface, cross-chain transactions, gasless swaps, verified listings and the right tools',
  image: 'https://demo2.crosswise.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Crosswise.Finance')} - ${t('Next-Gen Cross-Chain DEX 2.0')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} - ${t('Crosswise.Finance')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} - ${t('Crosswise.Finance')}`,
      }
    case '/exchange':
      return {
        title: `${t('Exchange')} - ${t('Crosswise.Finance')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} - ${t('Crosswise.Finance')}`,
      }
    case '/farms':
      return {
        title: `${t('Space Farms')} - ${t('Crosswise.Finance')}`,
      }
    case '/pools':
      return {
        title: `${t('Solar Pools')} - ${t('Crosswise.Finance')}`,
      }
    case '/moonwalkers':
      return {
        title: `${t('Moonwalker Referrals')} - ${t('Crosswise.Finance')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} - ${t('Crosswise.Finance')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} - ${t('Crosswise.Finance')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} - ${t('Crosswise.Finance')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} - ${t('Crosswise.Finance')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} - ${t('Crosswise.Finance')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} - ${t('Crosswise.Finance')}`,
      }
    case '/terms':
      return {
        title: `${t('Terms of Use')} - ${t('Crosswise.Finance')}`,
      }
    case '/privacy':
      return {
        title: `${t('Privacy Policy')} - ${t('Crosswise.Finance')}`,
      }
    default:
      return null
  }
}
