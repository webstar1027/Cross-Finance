import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import {
  Card,
  CardBody,
  Flex,
  PlayCircleOutlineIcon,
  Skeleton,
  Text,
  TooltipText,
  useTooltip,
} from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import { NodeRound, NodeLedger, BetPosition } from 'state/types'
import { BLOCK_PADDING } from 'state/predictions'
import { formatBigNumberToFixed } from 'utils/formatBalance'
import { useGetLastOraclePrice } from 'state/predictions/hooks'
import { useBlock } from 'state/block/hooks'
import BlockProgress from 'components/BlockProgress'
import { formatUsdv2, getPriceDifference } from '../../../helpers'
import PositionTag from '../../PositionTag'
import { RoundResultBox, LockPriceRow, PrizePoolRow } from '../../RoundResult'
import MultiplierArrow from '../MultiplierArrow'
import CardHeader from '../CardHeader'
import CalculatingCard from '../CalculatingCard'

interface LiveRoundCardProps {
  round: NodeRound
  betAmount?: NodeLedger['amount']
  hasEnteredUp: boolean
  hasEnteredDown: boolean
  bullMultiplier: string
  bearMultiplier: string
}

const LiveRoundCard: React.FC<LiveRoundCardProps> = ({
  round,
  betAmount,
  hasEnteredUp,
  hasEnteredDown,
  bullMultiplier,
  bearMultiplier,
}) => {
  const { t } = useTranslation()
  const { lockPrice, lockBlock, endBlock, totalAmount } = round
  const { currentBlock } = useBlock()
  const price = useGetLastOraclePrice()

  const isBull = lockPrice && price.gt(lockPrice)
  const priceColor = isBull ? 'success' : 'failure'
  const estimatedEndBlockPlusPadding = endBlock + BLOCK_PADDING

  const priceDifference = getPriceDifference(price, lockPrice)
  const priceAsNumber = parseFloat(formatBigNumberToFixed(price, 3, 8))

  const { countUp, update } = useCountUp({
    start: 0,
    end: priceAsNumber,
    duration: 1,
    decimals: 3,
  })
  const { targetRef, tooltip, tooltipVisible } = useTooltip(t('Last price from Chainlink Oracle'), {
    placement: 'bottom',
  })

  const updateRef = useRef(update)

  useEffect(() => {
    updateRef.current(priceAsNumber)
  }, [priceAsNumber, updateRef])

  if (currentBlock > estimatedEndBlockPlusPadding) {
    return <CalculatingCard round={round} />
  }

  return (
    <Card isActive>
      <CardHeader
        status="live"
        icon={<PlayCircleOutlineIcon mr="4px" width="24px" color="secondary" />}
        title={t('Live')}
        epoch={round.epoch}
        // blockNumber={estimatedEndBlockPlusPadding}
      />
      <BlockProgress variant="flat" scale="sm" startBlock={lockBlock} endBlock={estimatedEndBlockPlusPadding} />
      <CardBody p="16px">
        <MultiplierArrow
          betAmount={betAmount}
          multiplier={bullMultiplier}
          hasEntered={hasEnteredUp}
          isActive={isBull}
        />
        <RoundResultBox betPosition={isBull ? BetPosition.BULL : BetPosition.BEAR}>
          <Text color="textSubtle" fontSize="12px" bold textTransform="uppercase" mb="8px">
            {t('Last Price')}
          </Text>
          <Flex alignItems="center" justifyContent="space-between" mb="16px" height="36px">
            <div ref={targetRef}>
              <TooltipText bold color={priceColor} fontSize="24px" style={{ minHeight: '36px' }}>
                {price.gt(0) ? `$${countUp}` : <Skeleton height="36px" width="94px" />}
              </TooltipText>
            </div>
            <PositionTag betPosition={isBull ? BetPosition.BULL : BetPosition.BEAR}>
              {formatUsdv2(priceDifference)}
            </PositionTag>
          </Flex>
          {lockPrice && <LockPriceRow lockPrice={lockPrice} />}
          <PrizePoolRow totalAmount={totalAmount} />
        </RoundResultBox>
        <MultiplierArrow
          betAmount={betAmount}
          multiplier={bearMultiplier}
          betPosition={BetPosition.BEAR}
          hasEntered={hasEnteredDown}
          isActive={!isBull}
        />
      </CardBody>
      {tooltipVisible && tooltip}
    </Card>
  )
}

export default LiveRoundCard
