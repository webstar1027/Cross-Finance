import React from 'react'
import ApyButton from 'views/Pools/components/FarmCard/ApyButton'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
// import { BASE_ADD_LIQUIDITY_URL } from 'config'
// import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Skeleton, useMatchBreakpoints } from '@crosswiselabs/uikit'
import { Container, AprWrapper } from './styled'

export interface AprProps {
  value: string
  // multiplier: string
  lpLabel: string
  // eslint-disable-next-line
  tokenAddress?: Address
  // eslint-disable-next-line
  quoteTokenAddress?: Address
  // eslint-disable-next-line
  crssPrice?: BigNumber
  originalValue: number
  hideButton?: boolean
}

const Apr: React.FC<AprProps> = ({ value, lpLabel, originalValue, hideButton = false }) => {
  const { isXs, isSm } = useMatchBreakpoints()

  const isMobile = isXs || isSm
  // const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress })
  // const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <>
          <AprWrapper isMobile={isMobile}>{value}%</AprWrapper>
          {!hideButton && (
            <ApyButton
              lpLabel={lpLabel}
              // crssPrice={crssPrice}
              apr={originalValue}
              displayApr={value}
              // addLiquidityUrl={addLiquidityUrl}
            />
          )}
        </>
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue}%</AprWrapper>
    </Container>
  )
}

export default Apr
