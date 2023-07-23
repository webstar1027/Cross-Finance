import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trade, TradeType } from '@crosswise/sdk'
import { Flex, Button, Text, AutoRenewIcon } from '@crosswiselabs/uikit'
import { Field } from 'state/swap/actions'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity,
} from 'utils/prices'
// import { AutoColumn } from 'components/Layout/Column'
import QuestionHelper from 'components/QuestionHelper'
import { AutoRow, RowBetween, RowFixed } from 'components/Layout/Row'
import { PreTitle } from 'style/typography'
import { useTranslation } from 'contexts/Localization'
import FormattedPriceImpact from '../FormattedPriceImpact'
import { StyledBalanceMaxMini, SwapCallbackError } from '../styleds'
import { SwapModalFooterContainer, ToolTipText } from './styled'

export default function SwapModalFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}) {
  const { t } = useTranslation()
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)

  return (
    <>
      <SwapModalFooterContainer>
        <RowBetween align="center">
          <PreTitle>{t('Price')}</PreTitle>
          <Flex justifyContent="center" alignItems="center">
            <PreTitle pl="10px" textAlign="right">
              {formatExecutionPrice(trade, showInverted)}
            </PreTitle>
            <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
              <AutoRenewIcon width="14px" />
            </StyledBalanceMaxMini>
          </Flex>
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <PreTitle>{trade.tradeType === TradeType.EXACT_INPUT ? t('Minimum Received') : t('Maximum Sold')}</PreTitle>
            <QuestionHelper
              text="The minimum amount you will receive if this swap executes successfully, within your Slippage Tolerance."
              ml="4px"
            />
          </RowFixed>
          <RowFixed>
            <PreTitle>
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? '-'
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
            </PreTitle>
            <PreTitle marginLeft="4px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </PreTitle>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <PreTitle>{t('Price Impact')}</PreTitle>
            <QuestionHelper
              text="The impact on price achieved of your swap, which is primarily linked to depth of liquidity for this pair. The lower the price impact, the more efficient the swap."
              ml="4px"
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
                  Fees for this swap are shared. Liquidity providers get 0.17%. The other 0.03% is shared between sCRSS
                  stakers and the project. Find out more about our <Link to="/fees">Fees</Link>
                </ToolTipText>
              }
              ml="4px"
            />
          </RowFixed>
          <Text fontSize="14px">
            {realizedLPFee ? `${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}` : '-'}
          </Text>
        </RowBetween>
      </SwapModalFooterContainer>

      <AutoRow>
        <Button
          variant={severity > 2 ? 'danger' : 'primaryGradient'}
          onClick={onConfirm}
          disabled={disabledConfirm}
          mt="12px"
          id="confirm-swap-or-send"
          width="100%"
        >
          {severity > 2 ? 'Swap Anyway' : 'Confirm Swap'}
        </Button>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
