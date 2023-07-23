import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Text, Flex, useMatchBreakpoints, Skeleton } from '@crosswiselabs/uikit'
import BigNumber from 'bignumber.js'
import { TokenImage } from 'components/TokenImage'
import { useTranslation } from 'contexts/Localization'
import { usePoolUser } from 'state/pools/hooks'
import useTokenPrice from 'hooks/useTokenPrice'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { TokenWrapper, TableRow, TableCell } from './styled'

interface StakeRowProps {
  pool: Pool
}

const StakeRow = ({ pool }: StakeRowProps) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  const { t } = useTranslation()

  const staked = pool.userData ? new BigNumber(pool.userData.stakedBalance) : BIG_ZERO
  const displayStaked = staked && staked.gt(0) ? getBalanceNumber(staked) : 0
  const tokenPriceInUsd = useTokenPrice(pool.token)
  const stakedInUsd = getBalanceNumber(staked.multipliedBy(tokenPriceInUsd)).toFixed(4)

  const pendingCrss = pool.userData ? new BigNumber(pool.userData.pendingCrss) : BIG_ZERO
  const rawPendingCrss = Number.isNaN(pendingCrss.toNumber()) ? BIG_ZERO : getBalanceAmount(pendingCrss)
  const pendingCrssDisplay = rawPendingCrss.toFixed(2)

  const accumulatedRewards = pool.userData ? new BigNumber(pool.userData.accumulatedRewards) : BIG_ZERO
  const rawClaimedRewards = Number.isNaN(accumulatedRewards.toNumber())
    ? BIG_ZERO
    : getBalanceAmount(accumulatedRewards)
  const claimedRewardsDisplay = rawClaimedRewards.toFixed(2)

  return (
    <TableRow>
      <TableCell>
        <Flex alignItems="center">
          <TokenWrapper>
            <TokenImage token={pool.token} width={24} height={24} />
          </TokenWrapper>
          {pool.token.symbol}
        </Flex>
      </TableCell>
      <TableCell>{pool.userData.isAuto ? t('On') : t('Off')}</TableCell>
      <TableCell>{`${displayStaked.toLocaleString(undefined, { maximumFractionDigits: 2 })} CRSS`}</TableCell>
      <TableCell>{`${(+stakedInUsd).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD`}</TableCell>
      <TableCell>{`${pendingCrssDisplay} CRSS`}</TableCell>
      <TableCell>{`${claimedRewardsDisplay} CRSS`}</TableCell>
    </TableRow>
  )
}

export default StakeRow
