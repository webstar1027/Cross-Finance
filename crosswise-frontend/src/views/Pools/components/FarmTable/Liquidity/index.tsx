import React from 'react'
import { Text, useTooltip } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { useThemeManager } from 'state/user/hooks'
import { LiquidityWrapper, Container } from './styled'

export interface LiquidityProps {
  liquidity: BigNumber
}

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ liquidity }) => {
  // const displayLiquidity =
  //   liquidity && liquidity.gt(0) ? (
  //     `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  //   ) : (
  //     <Skeleton width={60} />
  //   )

  const displayLiquidity =
    liquidity && liquidity.gt(0)
      ? `$${liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 6 })}`
      : '$0'
  const { t } = useTranslation()

  const [isDark] = useThemeManager()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Total value of the funds in this farm’s liquidity pool'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container ref={targetRef}>
      <LiquidityWrapper>
        {/* <Text fontSize="16px">{displayLiquidity}</Text>
        <Text fontSize="12px">~ 0 USD</Text> */}
        <Text fontSize="16px">
          {/* 10000000 CRSS */}
          {displayLiquidity}
        </Text>
        <Text fontSize="13px" color="primaryGray">
          {`~ ${displayLiquidity} USD`}
        </Text>
      </LiquidityWrapper>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Liquidity
