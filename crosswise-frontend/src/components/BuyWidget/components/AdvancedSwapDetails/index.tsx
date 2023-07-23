import React from 'react'
import { Link } from 'react-router-dom'
import { Trade, TradeType } from '@crosswise/sdk'
import { Text } from '@crosswiselabs/uikit'
import { useTheme } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Field } from 'state/swap/actions'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import { PreTitle } from 'style/typography'
import FormattedPriceImpact from '../FormattedPriceImpact'
import SwapRoute from '../SwapRoute'
import { ToolTipText } from '../SwapModalFooter/styled'

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <AutoColumn>
      <RowBetween>
        <RowFixed>
          <PreTitle>{isExactIn ? t('Minimum Received') : t('Maximum Sold')}</PreTitle>
          <QuestionHelper
            text={t(
              'The minimum amount you will receive if this swap executes successfully, within your Slippage Tolerance.',
            )}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <RowFixed>
          <PreTitle gradient={isDark ? undefined : 'gradprimary'}>
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ?? '-'}
          </PreTitle>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <PreTitle>{t('Price Impact')}</PreTitle>
          <QuestionHelper
            text={t(
              'The impact on price achieved of your swap, which is primarily linked to depth of liquidity for this pair. The lower the price impact, the more efficient the swap.',
            )}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <PreTitle>{t('Swap Fee')}</PreTitle>
          <QuestionHelper
            text={
              <ToolTipText>
                Fees for this swap are shared. Liquidity providers get 0.17%. The other 0.08% is shared between sCRSS
                holders and the project. Find out more about our
                <a href="https://crosswise.finance/fees" target="_blank" rel="noreferrer">
                  <Text as="span" color="primary" ml="4px">
                    Fees
                  </Text>
                </a>
              </ToolTipText>
            }
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <PreTitle gradient={isDark ? undefined : 'gradprimary'}>
          {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
        </PreTitle>
      </RowBetween>
    </AutoColumn>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const { t } = useTranslation()
  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap="0px">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <RowBetween>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Text fontSize="13px">{t('Route')}</Text>
                  <QuestionHelper
                    text={t('Routing through these tokens resulted in the best price for your trade.')}
                    ml="4px"
                  />
                </span>
                <SwapRoute trade={trade} />
              </RowBetween>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
