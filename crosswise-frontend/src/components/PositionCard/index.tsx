import React, { useState } from 'react'
import { JSBI, Percent } from '@crosswise/sdk'
import {
  Button,
  Text,
  ChevronUpIcon,
  ChevronDownIcon,
  // Card,
  Flex,
  AddIcon,
} from '@crosswiselabs/uikit'
import { Link } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTotalSupply from 'hooks/useTotalSupply'

import { useTokenBalance } from 'state/wallet/hooks'
import { currencyId } from 'utils/currencyId'
import { unwrappedToken } from 'utils/wrappedCurrency'
import Collapse from 'components/Collapse'
import { BIG_INT_ZERO } from 'config/constants'

import { AutoColumn } from '../Layout/Column'
import CurrencyLogo from '../Logo/CurrencyLogo'
import { DoubleCurrencyLogo } from '../Logo'
import { RowFixed } from '../Layout/Row'
import Dots from '../Loader/Dots'
import { PositionCardProps } from './interfaces'
import { FixedHeightRow, TokenPairCard } from './styled'

export { MinimalPositionCard } from './MinimalPositionCard'

export default function FullPositionCard({ pair, ...props }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]
  return (
    <TokenPairCard {...props}>
      <Flex justifyContent="space-between" role="button" onClick={() => setShowMore(!showMore)} p="16px">
        <Flex flexDirection="column">
          <Flex alignItems="center" mb="4px">
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
            <Text bold ml="8px">
              {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol} - ${currency1.symbol}`}
            </Text>
          </Flex>
          <Text fontSize="14px" color="textSubtle">
            BALANCE: {userPoolBalance?.toSignificant(4)}
          </Text>
        </Flex>
        {showMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Flex>

      <Collapse isOpen={showMore}>
        <AutoColumn gap="8px" style={{ padding: '8px' }}>
          <FixedHeightRow>
            <RowFixed>
              <CurrencyLogo size="20px" currency={currency0} />
              <Text ml="4px">Pooled {currency0.symbol}</Text>
            </RowFixed>
            {token0Deposited ? (
              <RowFixed>
                <Text ml="6px" color="textSubtle">
                  {token0Deposited?.toSignificant(6)}
                </Text>
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow>
            <RowFixed>
              <CurrencyLogo size="20px" currency={currency1} />
              <Text ml="4px">Pooled {currency1.symbol}</Text>
            </RowFixed>
            {token1Deposited ? (
              <RowFixed>
                <Text ml="6px" color="textSubtle">
                  {token1Deposited?.toSignificant(6)}
                </Text>
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow>
            <Text>Share of pool</Text>
            <Text color="textSubtle">
              {poolTokenPercentage
                ? `${poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)}%`
                : '-'}
            </Text>
          </FixedHeightRow>

          {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, BIG_INT_ZERO) && (
            <Flex flexDirection="column">
              <Button
                as={Link}
                to={`/liquidity/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
                variant="primaryGradient"
                width="100%"
                mb="8px"
              >
                Remove
              </Button>
              <Button
                as={Link}
                to={`/liquidity/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                variant="text"
                startIcon={<AddIcon color="primary" />}
                width="100%"
              >
                Add liquidity instead
              </Button>
            </Flex>
          )}
        </AutoColumn>
      </Collapse>
    </TokenPairCard>
  )
}
