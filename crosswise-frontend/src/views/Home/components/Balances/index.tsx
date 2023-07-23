import React from 'react'
import { useSelector } from 'react-redux'
import { Text, TotalIcon, Skeleton } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import { insertThousandSeparator } from 'utils/other'
import { SmallTitle, PreTitle } from 'style/typography'
import { Container, SubColumn, StyledValue, SubColumnTitle } from './styled'

const Balances = ({ allEarnings, allStakings, allVestings }) => {
  const farmsDataLoaded = useSelector((state: any) => state.farms.userDataLoaded)
  const poolsDataLoaded = useSelector((state: any) => state.pools.userDataLoaded)
  const dataIsLoaded = farmsDataLoaded && poolsDataLoaded
  const { t } = useTranslation()

  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + earning
  }, 0)
  const vestingsSum = allVestings.reduce((sum, vesting) => {
    return sum + vesting
  }, 0)
  const stakingsSum = allStakings.reduce((sum, staking) => {
    return sum + staking
  }, 0)
  const totalValue = earningsSum + vestingsSum + stakingsSum
  return (
    <Container>
      <SubColumnTitle>
        <SmallTitle display="flex">
          {t('BALANCES')} &nbsp;
          <TotalIcon fill="primaryText" width="17px" />
        </SmallTitle>
        <Text>&nbsp;</Text>
      </SubColumnTitle>
      <SubColumn>
        <PreTitle>{t('Total Value')} (USD)</PreTitle>
        <StyledValue>
          {dataIsLoaded ? <>${insertThousandSeparator(totalValue.toFixed(2))}</> : <Skeleton width={60} />}
        </StyledValue>
      </SubColumn>
      <SubColumn>
        <PreTitle>{t('Claimable')}</PreTitle>
        <StyledValue>
          {dataIsLoaded ? <>${insertThousandSeparator(earningsSum.toFixed(2))}</> : <Skeleton width={60} />}
        </StyledValue>
      </SubColumn>
      <SubColumn>
        <PreTitle>{t('Total Vested')}</PreTitle>
        <StyledValue>
          {dataIsLoaded ? <>${insertThousandSeparator(vestingsSum.toFixed(2))}</> : <Skeleton width={60} />}
        </StyledValue>
      </SubColumn>
      <SubColumn>
        <PreTitle>{t('Total Staked')} (USD)</PreTitle>
        <StyledValue>
          {dataIsLoaded ? <>${insertThousandSeparator(stakingsSum.toFixed(2))}</> : <Skeleton width={60} />}
        </StyledValue>
      </SubColumn>
    </Container>
  )
}

export default Balances
