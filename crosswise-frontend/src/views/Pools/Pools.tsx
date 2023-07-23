import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import {
  RowType,
  Toggle,
  // Text,
  Button,
  Flex,
  TabMenu,
  Tab,
  Dropdown,
  useMatchBreakpoints,
  ExpandableButton,
  Skeleton,
  // darkColors,
} from '@crosswiselabs/uikit'
// import StyledPage from 'components/Layout/Page'
import { usePools, usePollPoolsData, usePriceCrssBusd } from 'state/pools/hooks'
import usePoolTvl from 'hooks/usePoolTvl'

import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPoolApr } from 'utils/apr'
import { insertThousandSeparator } from 'utils/other'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import { BIG_ZERO } from 'utils/bigNumber'
import { useUserPoolStakedOnly } from 'state/user/hooks'
import Loading from 'components/Loading'
import useToast from 'hooks/useToast'
import { BodyFont, PreTitle, SmallCopy, FieldLabel } from 'style/typography'
import Collapse from 'components/Collapse'
import {
  FarmHeadCard,
  FarmHeadCardHeader,
  FarmHeadCardOperationPanel,
  SearchIcon,
  SearchInputBox,
  SearchInputWrapper,
  ActiveFinishButtons,
  StakingToggle,
  FarmHeadCardEarningPanelWrapper,
  FarmHeadCardEarningPanel,
  StyledIconPendingRewards,
  StyledIconTotalStaked,
  HeadCardOperationPanelWrapper,
  FarmHeadCardTitle,
  MassBtns,
} from 'views/Farms/styled'
import { FarmStatsIcon } from 'components/SvgIcons'

import {
  // FarmCard,
  FarmWithStakedValue,
} from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import {
  DesktopColumnSchema,
  // ViewMode
} from './components/types'
import useMassFarm from './hooks/useMassFarm'
import { fetchCompensationInfo } from './hooks/useCompensation'
import { FarmHeaderLayout, ToggleWrapper } from './styled'
import Page from '../Page'
import { TabMenuWrapper } from '../Trade/shared'

const NUMBER_OF_FARMS_VISIBLE = 12

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Farms: React.FC = () => {
  const { isXs, isSm } = useMatchBreakpoints()
  const {
    // path,
    url,
  } = useRouteMatch()
  const { toastSuccess, toastError } = useToast()
  const { pathname } = useLocation()
  const history = useHistory()
  const { t } = useTranslation()
  const { data: pools, userDataLoaded } = usePools()
  const crssPrice = usePriceCrssBusd()
  const [, setCrssTokenPrice] = useState(new BigNumber(0))
  const [isCompensationUser, setCompensationUser] = useState(false)
  const [query, setQuery] = useState('')
  const poolTvltmp = usePoolTvl()
  // const userStakedVal = useUserPoolStaked()
  const [crssTokenEarned, setCrssTokenEarned] = useState(0)
  const [pendingTx, setPendingTx] = useState(false)
  const [headCardExpanded, setHeadCardExpanded] = useState(true)
  // const [viewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'crosswise_farm_view' })
  const { account } = useWeb3React()
  const chosenFarmsLength = useRef(0)
  const [totalPendingCrss, setTotalPendingCrss] = useState(0)
  // const [isDark] = useThemeManager()

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollPoolsData(isArchived)

  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserPoolStakedOnly(isActive)
  const { onMassHarvest } = useMassFarm()
  const activeFarms = pools.filter((farm) => farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = pools.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = pools.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Pool[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        const apr = getPoolApr(
          getBalanceNumber(crssPrice, 0), // stakingTokenPrice
          getBalanceNumber(crssPrice, 0), // rewardTokenPrice
          Number(farm.tokenAmountMc), // total staked
          getBalanceNumber(new BigNumber(farm.userData.stakedBalance), 18), // usertotalStaked
          new BigNumber(farm.poolWeight), // poolWeight
        )
        return { ...farm, apr }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [crssPrice, query],
  )

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const sortOpts = [
    {
      label: t('Hot'),
      value: 'hot',
    },
    {
      label: t('APR'),
      value: 'apr',
    },
    {
      label: t('Multiplier'),
      value: 'multiplier',
    },
    {
      label: t('Earned'),
      value: 'earned',
    },
    {
      label: t('Liquidity'),
      value: 'liquidity',
    },
  ]
  const [sortOption, setSortOption] = useState(sortOpts[0])

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption.value) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  chosenFarmsLength.current = chosenFarmsMemoized.length
  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
          if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
            return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
          }
          return farmsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }

    let temp = new BigNumber(0)
    const getStakedVal = () => {
      chosenFarmsMemoized.map((farm) => {
        // const lpPrice = useLpTokenPrice(farm.lpSymbol)
        temp = temp.plus(farm.userData?.earnings)
        return temp
      })
      if (!crssPrice.isNaN()) {
        setCrssTokenEarned(getBalanceNumber(temp.times(crssPrice).dividedBy(2)))
      }
    }
    getStakedVal()
  }, [chosenFarmsMemoized, observerIsSet, crssPrice])
  useEffect(() => {
    let totalEarnedValue = BIG_ZERO
    let totalPendingValue = BIG_ZERO
    pools.forEach((farm: any) => {
      const {
        userData: { accumulatedRewards, pendingCrss },
      } = farm
      totalEarnedValue = totalEarnedValue.plus(new BigNumber(accumulatedRewards || '0'))
      totalPendingValue = totalPendingValue.plus(new BigNumber(pendingCrss || '0'))
    })
    setCrssTokenEarned(getBalanceNumber(totalEarnedValue))
    setTotalPendingCrss(getBalanceNumber(totalPendingValue))
  }, [pools])
  useEffect(() => {
    setCrssTokenPrice(crssPrice)
  }, [crssPrice])
  useEffect(() => {
    if (account)
      fetchCompensationInfo(account).then((val) => {
        setCompensationUser(val)
      })
    else setCompensationUser(false)
  }, [account])
  const handleMassHarvest = async () => {
    try {
      setPendingTx(true)
      await onMassHarvest()
      toastSuccess(t('Success'), 'Successfully Harvested')
    } catch (err: any) {
      toastError(t('Error'), err)
    } finally {
      setPendingTx(false)
    }
  }
  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('CROSSWISE', '')

    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        crssPrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      depositFee: {
        depositFee: farm.depositFee,
      },
      farmOption: {
        isAuto: farm.userData.isAuto,
        isVest: farm.userData.isVest,
      },
      staked: {
        staked: new BigNumber(farm.userData?.stakedBalance),
        userDataReady,
        farm,
      },
      details: farm,
      userData: {
        accumulatedRewards: getBalanceNumber(new BigNumber(farm.userData.accumulatedRewards)),
        pendingCrss: getBalanceNumber(new BigNumber(farm.userData.pendingCrss)),
        vestingRewards: getBalanceNumber(new BigNumber(farm.userData.vestingRewards)),
      },
      account,
    }
    return row
  })
  // const handleToggle = (mode: ViewMode) => {
  //   if (viewMode !== mode) {
  //     setViewMode(mode)
  //   }
  // }

  const handleItemClick = (index: number) => {
    if (index === 0) {
      history.push('/farms')
    }
  }

  const handleChangeSearchInput = (e) => {
    const {
      target: { value: searchValue },
    } = e
    setQuery(searchValue)
  }

  const handleClickFarmHeadCardHeader = () => {
    setHeadCardExpanded(!headCardExpanded)
  }

  const onChangeFilterOpt = (item: any) => {
    // setFilterOpt({ ...item })
    setSortOption({ ...item })
  }

  const isMobile = isXs || isSm

  const ActiveFinishButtonsContainer: JSX.Element = (
    <>
      <ActiveFinishButtons
        scale="xs"
        variant="primaryGradientOutline"
        mr={10}
        width="70px"
        checked={isActive}
        onClick={() => history.push(url)}
      >
        Active
      </ActiveFinishButtons>
      <ActiveFinishButtons
        scale="xs"
        width="70px"
        variant="primaryGradientOutline"
        checked={isInactive}
        onClick={() => history.push(`${url}/history`)}
      >
        Finished
      </ActiveFinishButtons>
    </>
  )

  const SortButtonContainer: JSX.Element = (
    <Dropdown list={sortOpts} current={sortOption} placement="bottom-end" onClickItem={onChangeFilterOpt} />
  )

  const StakedOnlyToggleButtonContainer: JSX.Element = (
    <Flex justifyContent="flex-end">
      <StakingToggle>
        <ToggleWrapper>
          <FieldLabel pr="15px">{t('Staked only')}</FieldLabel>
          <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="md" />
        </ToggleWrapper>
      </StakingToggle>
    </Flex>
  )

  const HeadCardOperationPanelContainer: JSX.Element = (
    <HeadCardOperationPanelWrapper isMobile={isMobile}>
      <FarmHeadCardOperationPanel isMobile={isMobile}>
        <Flex justifyContent="space-between">
          <Flex alignItems="center">{!isMobile && ActiveFinishButtonsContainer}</Flex>
          {isMobile ? StakedOnlyToggleButtonContainer : SortButtonContainer}
        </Flex>

        <SearchInputWrapper>
          <SearchInputBox onChange={handleChangeSearchInput} placeholder="Please type here to search..." />
          <SearchIcon />
        </SearchInputWrapper>
        {isMobile ? (
          <Flex justifyContent="space-between" alignItems="center">
            <div>{ActiveFinishButtonsContainer}</div>
            {SortButtonContainer}
          </Flex>
        ) : (
          StakedOnlyToggleButtonContainer
        )}
      </FarmHeadCardOperationPanel>
    </HeadCardOperationPanelWrapper>
  )

  const renderContent = (): JSX.Element => {
    if (
      // !isMobile &&
      // viewMode === ViewMode.TABLE &&
      rowData.length
    ) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
        hidden: column.hidden,
      }))

      return (
        <Table
          data={rowData}
          columns={columns}
          userDataReady={userDataReady}
          account={account}
          compensation={isCompensationUser}
        />
      )
    }
    return null
  }

  const BtnMassHarvest = (): JSX.Element => (
    <MassBtns>
      <Button
        variant="primaryGradient"
        mr="18px"
        onClick={account ? () => handleMassHarvest() : null}
        disabled={!account}
        isLoading={pendingTx}
      >
        {t('Mass Harvest')}
      </Button>
    </MassBtns>
  )

  return (
    <Page title={t('Solar Pools')} subTitle={t('Stake CRSS to Earn CRSS')}>
      <FarmHeaderLayout isMobile={isMobile}>
        <TabMenuWrapper>
          <TabMenu activeIndex={1} onItemClick={handleItemClick} fullWidth>
            <Tab>{t('Space Farms')}</Tab>
            <Tab>{t('Solar Pools')}</Tab>
          </TabMenu>
        </TabMenuWrapper>
        <FarmHeadCard isMobile={isMobile}>
          <FarmHeadCardHeader onClick={handleClickFarmHeadCardHeader}>
            <div />
            <FarmHeadCardTitle>
              <FarmStatsIcon />
              <BodyFont fontWeight={700} ml="8px">
                {t('Pool Stats')}
              </BodyFont>
            </FarmHeadCardTitle>
            <ExpandableButton direction={headCardExpanded ? 'up' : 'down'} />
          </FarmHeadCardHeader>

          <Collapse isOpen={isMobile || headCardExpanded}>
            <Flex
              justifyContent="space-evenly"
              // alignItems="center"
              mt={19}
              mb={30}
            >
              <Flex
                flexDirection="column"
                alignItems="center"
                // justifyContent="space-between"
              >
                <Flex alignItems="center" flexDirection="column">
                  <StyledIconTotalStaked />
                  <PreTitle mt="8px">{t('Total Staked')}</PreTitle>
                </Flex>
                <BodyFont>{`${insertThousandSeparator(poolTvltmp)} USD`}</BodyFont>
              </Flex>
              {!isMobile && !!account && (
                <FarmHeadCardEarningPanelWrapper justifyContent="center" alignItems="center">
                  <FarmHeadCardEarningPanel>
                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center">
                      <PreTitle>$CRSS Earned</PreTitle>
                      <BodyFont my="3px">
                        {userDataReady ? (
                          insertThousandSeparator(crssTokenEarned?.toFixed(2))
                        ) : (
                          <Skeleton width={110} />
                        )}
                      </BodyFont>
                      <SmallCopy>
                        {userDataReady ? (
                          `~ ${insertThousandSeparator((crssTokenEarned * crssPrice.toNumber()).toFixed(2))} USD`
                        ) : (
                          <Skeleton width={110} />
                        )}
                      </SmallCopy>
                    </Flex>
                  </FarmHeadCardEarningPanel>
                </FarmHeadCardEarningPanelWrapper>
              )}
              <Flex
                flexDirection="column"
                alignItems="center"
                //  justifyContent="space-between"
              >
                <Flex alignItems="center" flexDirection="column">
                  {/* {isMobile && <PendingRewardIcon />} */}
                  <StyledIconPendingRewards />
                  <PreTitle mt="8px">Pending Rewards</PreTitle>
                </Flex>
                <BodyFont my="3px">
                  {userDataReady ? insertThousandSeparator(totalPendingCrss?.toFixed(2)) : <Skeleton width={110} />}
                </BodyFont>
                <SmallCopy>
                  {userDataReady ? (
                    `~ ${insertThousandSeparator((totalPendingCrss * crssPrice.toNumber()).toFixed(2))} USD`
                  ) : (
                    <Skeleton width={110} />
                  )}
                </SmallCopy>
              </Flex>
              {!isMobile && <BtnMassHarvest />}
            </Flex>

            {isMobile && <BtnMassHarvest />}
          </Collapse>
        </FarmHeadCard>
      </FarmHeaderLayout>

      {/* {!isMobile && HeadCardOperationPanelContainer} */}
      {HeadCardOperationPanelContainer}
      <Flex flexDirection="column">
        {renderContent()}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={loadMoreRef} />
      </Flex>
    </Page>
  )
}

export default Farms
