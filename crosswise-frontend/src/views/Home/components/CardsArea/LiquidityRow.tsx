import React, { useMemo } from 'react'
import { Text, Flex, useMatchBreakpoints, Skeleton } from '@crosswiselabs/uikit'
import BigNumber from 'bignumber.js'
import { TokenPairImage } from 'components/TokenImage'
import { useTranslation } from 'contexts/Localization'
import { useFarms, useFarmUser, usePriceCrssBusd } from 'state/farms/hooks'
import useLpPrice from 'hooks/useLpPrice'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import { Farm } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { TokenWrapper, LockIcon, TableRow, TableCell } from './styled'

interface LiquidityRowProps {
  farm: Farm
}

const LiquidityRow = ({ farm }: LiquidityRowProps) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  const { t } = useTranslation()

  const staked = farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO
  const displayLiquidity = staked && staked.gt(0) ? getBalanceNumber(staked) : 0
  const lpPriceInUsd = useLpPrice(farm)
  const stakedInUsd = getBalanceNumber(staked.multipliedBy(lpPriceInUsd)).toFixed(4)

  const pendingCrss = farm.userData ? new BigNumber(farm.userData.pendingCrss) : BIG_ZERO
  const rawPendingCrss = Number.isNaN(pendingCrss.toNumber()) ? BIG_ZERO : getBalanceAmount(pendingCrss)
  const pendingCrssDisplay = rawPendingCrss.toFixed(2)

  const accumulatedRewards = farm.userData ? new BigNumber(farm.userData.accumulatedRewards) : BIG_ZERO
  const rawClaimedRewards = Number.isNaN(accumulatedRewards.toNumber())
    ? BIG_ZERO
    : getBalanceAmount(accumulatedRewards)
  const claimedRewardsDisplay = rawClaimedRewards.toFixed(2)

  const lpLabel = useMemo(() => {
    return farm.lpSymbol && farm.lpSymbol.replace(/ LP /g, ' ').toUpperCase().replace('CROSSWISE', '')
  }, [farm])

  return (
    <TableRow>
      <TableCell>
        <Flex alignItems="center">
          <TokenWrapper>
            <TokenPairImage primaryToken={farm.token} secondaryToken={farm.quoteToken} width={24} height={24} />
          </TokenWrapper>
          {lpLabel}
          {farm.isLock && <LockIcon />}
        </Flex>
      </TableCell>
      <TableCell>{farm.userData.isAuto ? t('On') : t('Off')}</TableCell>
      <TableCell>{`${displayLiquidity.toLocaleString(undefined, { maximumFractionDigits: 2 })} LP`}</TableCell>
      <TableCell>{`${(+stakedInUsd).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD`}</TableCell>
      <TableCell>{`${pendingCrssDisplay} CRSS`}</TableCell>
      <TableCell>{`${claimedRewardsDisplay} CRSS`}</TableCell>
    </TableRow>
  )
}

export default LiquidityRow
