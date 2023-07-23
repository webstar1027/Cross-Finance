import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Text, Flex, useMatchBreakpoints, Skeleton } from '@crosswiselabs/uikit'
import BigNumber from 'bignumber.js'
import { TokenPairImage } from 'components/TokenImage'
import { useTranslation } from 'contexts/Localization'
import { useFarms, usePollFarmsData, usePriceCrssBusd } from 'state/farms/hooks'
import getLpPriceInUsd from 'utils/getLpPriceInUsd'
import { insertThousandSeparator } from 'utils/other'
import { getBalanceNumber } from 'utils/formatBalance'
import { Farm } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { SubTitle, TableWrapper, HeaderRow, HeaderCell, TableCell, NoDataRow } from './styled'
import LiquidityRow from './LiquidityRow'

const LiquidityTable = () => {
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  const { t } = useTranslation()

  const [totalLiquidity, setTotalLiquidity] = useState<string>('')
  const { data: farmsLP, userDataLoaded } = useFarms()

  const crssPrice = usePriceCrssBusd()

  const stakedOnlyFarms = farmsLP.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  useEffect(() => {
    if (!userDataLoaded) return

    let totalValue = new BigNumber(BIG_ZERO)
    stakedOnlyFarms.map(async (_farm) => {
      const staked = _farm.userData ? new BigNumber(_farm.userData.stakedBalance) : BIG_ZERO
      const calculatedValue = await getLpPriceInUsd(_farm, crssPrice)
      totalValue = totalValue.plus(staked.multipliedBy(calculatedValue))
      setTotalLiquidity(getBalanceNumber(totalValue).toFixed(2))
    })
  }, [userDataLoaded, stakedOnlyFarms, crssPrice])

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <SubTitle>{t('Your Liquidity')}</SubTitle>
        <SubTitle>
          {userDataLoaded ? `${insertThousandSeparator(totalLiquidity)} USD` : <Skeleton width="160px" />}
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
        {userDataLoaded && stakedOnlyFarms.map((_farm) => <LiquidityRow key={_farm.pid} farm={_farm} />)}
        {stakedOnlyFarms.length === 0 && (
          <NoDataRow>
            {userDataLoaded ? <TableCell>{t('No Liquidity')}</TableCell> : <Skeleton width="200px" />}
          </NoDataRow>
        )}
      </TableWrapper>
    </>
  )
}

export default LiquidityTable
