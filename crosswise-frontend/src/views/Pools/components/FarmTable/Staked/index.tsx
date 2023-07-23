import React from 'react'
import {
  // Text,
  Skeleton,
  // useTooltip,
  useMatchBreakpoints,
} from '@crosswiselabs/uikit'
// import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
// import { useThemeManager } from 'state/user/hooks'
import useTokenPrice from 'hooks/useTokenPrice'
import { getBalanceNumber } from 'utils/formatBalance'
import { BodyFont, SmallCopy } from 'style/typography'
import { LiquidityWrapper, Container } from './styled'

export interface StakedProps {
  staked: BigNumber
  userDataReady: boolean
  farm: any
}

const Staked: React.FunctionComponent<StakedProps> = ({ staked, userDataReady, farm }) => {
  // const displayLiquidity =
  //   liquidity && liquidity.gt(0) ? (
  //     `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  //   ) : (
  //     <Skeleton width={60} />
  //   )

  const { isXs, isSm } = useMatchBreakpoints()

  const isMobile = isXs || isSm

  const displayLiquidity = staked && staked.gt(0) ? getBalanceNumber(staked) : 0
  // const { t } = useTranslation()
  const lpPriceInUsd = useTokenPrice(farm.token)
  const stakedInUsd = getBalanceNumber(staked.multipliedBy(lpPriceInUsd)).toFixed(4)

  // const [isDark] = useThemeManager()
  // const { targetRef, tooltip, tooltipVisible } = useTooltip(
  //   t('Total value of the funds in this farm’s liquidity pool'),
  //   { placement: 'top-end', tooltipOffset: [20, 10] },
  // )

  return (
    <Container>
      <LiquidityWrapper isMobile={isMobile}>
        <BodyFont textAlign="center" mr={isMobile ? '10px' : 0}>
          {/* 10000000 CRSS */}
          {userDataReady ? (
            `${displayLiquidity.toLocaleString(undefined, { maximumFractionDigits: 2 })} CRSS`
          ) : (
            <Skeleton width={60} />
          )}
        </BodyFont>
        <SmallCopy mt={isMobile ? 0 : '5px'} textAlign="center">
          {userDataReady ? (
            `~ ${(+stakedInUsd).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD`
          ) : (
            <Skeleton width={60} />
          )}
        </SmallCopy>
      </LiquidityWrapper>
      {/* {tooltipVisible && tooltip} */}
    </Container>
  )
}

export default Staked
