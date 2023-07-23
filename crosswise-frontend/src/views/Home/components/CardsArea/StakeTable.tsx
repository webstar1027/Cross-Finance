import React, { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Text, Flex, useMatchBreakpoints, Skeleton } from '@crosswiselabs/uikit'
import BigNumber from 'bignumber.js'
import { usePools, usePollPoolsData, usePriceCrssBusd } from 'state/pools/hooks'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import { insertThousandSeparator } from 'utils/other'
import { farmsConfig, poolsConfig } from 'config/constants'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { SubTitle, TableWrapper, HeaderRow, HeaderCell, TableCell, NoDataRow } from './styled'
import StakeRow from './StakeRow'

const LiquidityTable = () => {
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  const { data: pools, userDataLoaded } = usePools()
  const { chainId } = useActiveWeb3React()
  const allConfig = farmsConfig.concat(poolsConfig)
  const { t } = useTranslation()

  const crssPrice = usePriceCrssBusd()

  const stakedOnlyPools = pools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )

  const totalStaked = useMemo(() => {
    if (!userDataLoaded) return BIG_ZERO

    let totalValue = new BigNumber(BIG_ZERO)
    stakedOnlyPools.forEach((_pool) => {
      const staked = _pool.userData ? new BigNumber(_pool.userData.stakedBalance) : BIG_ZERO
      totalValue = totalValue.plus(staked)
    })
    return totalValue
  }, [userDataLoaded, stakedOnlyPools])

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <SubTitle>{t('Your Stakes')}</SubTitle>
        <SubTitle>
          {userDataLoaded ? (
            `${insertThousandSeparator(getBalanceNumber(totalStaked.multipliedBy(crssPrice)).toFixed(2))} USD`
          ) : (
            <Skeleton width="160px" />
          )}
        </SubTitle>
      </Flex>
      <TableWrapper>
        <HeaderRow>
          <HeaderCell>{t('Pool')}</HeaderCell>
          <HeaderCell>{t('Hyper Accelerator')}</HeaderCell>
          <HeaderCell>{t('Amount')}</HeaderCell>
          <HeaderCell>{t('Value')}</HeaderCell>
          <HeaderCell>{t('Unclaimed')}</HeaderCell>
          <HeaderCell>{t('To harvest')}</HeaderCell>
        </HeaderRow>
        {userDataLoaded && stakedOnlyPools.map((_pool) => <StakeRow key={_pool.pid} pool={_pool} />)}
        {stakedOnlyPools.length === 0 && (
          <NoDataRow>
            {userDataLoaded ? <TableCell>{t('No Staked Pool')}</TableCell> : <Skeleton width="200px" />}
          </NoDataRow>
        )}
      </TableWrapper>
    </>
  )
}

export default LiquidityTable
