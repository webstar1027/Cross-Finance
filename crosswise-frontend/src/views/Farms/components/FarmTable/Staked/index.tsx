import React from 'react'
import {
  Text,
  Skeleton,
  // useTooltip,
  useMatchBreakpoints,
} from '@crosswiselabs/uikit'
// import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { useThemeManager } from 'state/user/hooks'
import useLpPrice from 'hooks/useLpPrice'
import { getBalanceNumber } from 'utils/formatBalance'
import { BodyFont, SmallCopy } from 'style/typography'
import { LiquidityWrapper, Container } from './styled'

export interface StakedProps {
  staked: BigNumber
  userDataReady: boolean
  farm: any
}

const Staked: React.FunctionComponent<StakedProps> = ({ staked, userDataReady, farm }) => {
  const { isXs, isSm } = useMatchBreakpoints()

  const isMobile = isXs || isSm

  const displayLiquidity = staked && staked.gt(0) ? getBalanceNumber(staked) : 0
  // const { t } = useTranslation()

  const lpPriceInUsd = useLpPrice(farm)
  const stakedInUsd = getBalanceNumber(staked.multipliedBy(lpPriceInUsd)).toFixed(4)

  return (
    <Container>
      <LiquidityWrapper isMobile={isMobile}>
        {userDataReady ? (
          <>
            <BodyFont textAlign="center" mr={isMobile ? '10px' : 0}>
              {`${displayLiquidity.toLocaleString(undefined, { maximumFractionDigits: 2 })} LP`}
            </BodyFont>
            <SmallCopy mt={isMobile ? 0 : '5px'} textAlign="center">
              {`~ ${(+stakedInUsd).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD`}
            </SmallCopy>
          </>
        ) : (
          <>
            <Skeleton width={60} mr={isMobile ? '10px' : 0} />
            <Skeleton width={60} mt={isMobile ? 0 : '5px'} />
          </>
        )}
      </LiquidityWrapper>
      {/* {tooltipVisible && tooltip} */}
    </Container>
  )
}

export default Staked
