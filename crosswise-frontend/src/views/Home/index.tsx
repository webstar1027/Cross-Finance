import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Heading, useMatchBreakpoints } from '@crosswiselabs/uikit'
import Row from 'components/Layout/Row'
import { API_URL } from 'config'
import { AutoColumn } from 'components/Layout/Column'
import { HorizontalDivider } from 'components/Divider'
import { useTranslation } from 'contexts/Localization'
import { usePollFarmsData, usePriceCrssBusd } from 'state/farms/hooks'
import { usePollPoolsData } from 'state/pools/hooks'
import { H5 } from 'style/typography'
import useFetch from 'hooks/useFetch'
import useToast from 'hooks/useToast'
import useReferralsReferrer from 'views/Referral/hooks/useReferralsReferrer'

import useAllLps from './hooks/useAllLps'
import useAllAccRewards from './hooks/useAllAccRewards'
import useAllEarnings from './hooks/useAllEarnings'
import useAllStakings from './hooks/useAllStakings'
import useAllVestings from './hooks/useAllVestings'
import Chart from './components/BasicChart'
import AboutCrss from './components/AboutCrss'
import Header from './components/Header'
import SocialLink from './components/SocialLink'
import Balances from './components/Balances'
import CardsArea from './components/CardsArea'
import { StyledPage, StyledRow } from './styled'

const Home: React.FC = () => {
  const { t } = useTranslation()
  const { isXs, isSm, isMd } = useMatchBreakpoints()
  const crssPriceBusd = usePriceCrssBusd()
  const farms = useSelector((state: any) => state.farms.data)
  const pools = useSelector((state: any) => state.pools.data)
  // console.log('farms & pools: ', farms, pools)
  const allEarnings = useAllEarnings(farms, pools, crssPriceBusd)
  const allStakings = useAllStakings()
  // const { allLps, allStakings } = useAllStakings()
  // const allStakings = []
  const allVestings = useAllVestings(farms, pools, crssPriceBusd)
  const allLps = useAllLps()
  // const allLps = []
  const allAccRewards = useAllAccRewards(farms, pools, crssPriceBusd)
  const isMobile = isXs || isSm || isMd
  usePollFarmsData()
  usePollPoolsData()

  const { account } = useWeb3React()
  const { pathname, search } = useLocation()
  const ref = new URLSearchParams(search).get('ref')
  const history = useHistory()
  const { getRequest, postRequest } = useFetch()
  const { toastSuccess, toastError } = useToast()
  const referrer = useReferralsReferrer()

  useEffect(() => {
    const setRef = async () => {
      const response = await postRequest(`${API_URL}/profiles/set_referrer/${ref}/${account}`, {})
      if (response.success) {
        toastSuccess('Success', `You set referrer successfully.`)
        // setReferrer(ref)
        history.push(pathname)
      } else if (response?.response?.data?.msg) {
        const errMsg = response.response.data.msg
        toastError('Error', errMsg)
        history.push(pathname)
      }
    }
    if (account && ref && referrer && parseInt(referrer) === 0) setRef()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, account, referrer])

  return (
    <>
      <StyledPage>
        <Row justify="center">
          <AutoColumn justify="center">
            {!isMobile && (
              <Heading as="h1" scale="xxl" mb="24px" color="text">
                <Header isMobile={isMobile} />
              </Heading>
            )}
            <H5>{t('Cross-Chain DEX 2.0 With Built-In Tools & Gas Savings')}</H5>
            <SocialLink />
          </AutoColumn>
        </Row>
        <Row>
          <AboutCrss />
        </Row>
        <StyledRow>
          <Balances allEarnings={allEarnings} allStakings={allStakings} allVestings={allVestings} />
          <HorizontalDivider />
          <CardsArea
            // crssPriceBusd={crssPriceBusd}
            allStakings={allStakings}
            allLps={allLps}
            allAccRewards={allAccRewards}
          />
        </StyledRow>
        {!isMobile && (
          <StyledRow>
            <Chart />
          </StyledRow>
        )}
      </StyledPage>
    </>
  )
}

export default Home
