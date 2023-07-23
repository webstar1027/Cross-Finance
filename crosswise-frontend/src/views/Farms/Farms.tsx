import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import {
  // Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom'
import { ethers, BigNumber as EthBigNumber } from 'ethers'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import {
  RowType,
  Toggle,
  Text,
  Button,
  Flex,
  TabMenu,
  Tab,
  Dropdown,
  useMatchBreakpoints,
  ExpandableButton,
  Skeleton,
} from '@crosswiselabs/uikit'
import { ChainId } from '@crosswise/sdk'
// import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsData, usePriceCrssBusd } from 'state/farms/hooks'
// import useTVL from 'hooks/useTvl'
// import useFarmTvl from 'hooks/useFarmTvl'
// import useUserFarmStaked from 'hooks/useUserFarmStaked'
import useToast from 'hooks/useToast'
// import usePersistState from 'hooks/usePersistState'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { insertThousandSeparator } from 'utils/other'
import { orderBy, debounce } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import { BIG_ZERO } from 'utils/bigNumber'
import { useUserFarmStakedOnly, useThemeManager } from 'state/user/hooks'
// import { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import { BodyFont, PreTitle, SmallTitle, SmallCopy, FieldLabel } from 'style/typography'
import Collapse from 'components/Collapse'
import { FarmStatsIcon } from 'components/SvgIcons'

// import { IconGridOutlined, IconListFill, IconGridFill, IconListOutlined } from 'components/SvgIcons'
// import SvgButton from 'components/SvgButton'
// import CustomText from 'components/CustomText'

import QuestionHelper from 'components/QuestionHelper'
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
import {
  FarmHeader,
  FarmHeaderLayout,
  FarmHeadCard,
  HeaderTopBar,
  // HeaderInfo,
  // HeaderInfoItem,
  // HeaderInfoVolumeIcon,
  // HeaderInfoTotalValueLockedIcon,
  // HeaderInfoTotalLiquidityIcon,
  FarmHeadCardHeader,
  ToggleWrapper,
  // CardWrapper,
  // CardItem,
  // CardItemLock,
  // InfoWrap,
  // HarvestBtnGroup,
  StakingToggle,
  // FarmUserInfo,
  MassBtns,
  // FarmCardsLayout,
  FarmHeadCardTitle,
  // PendingRewardIcon,
  // TotalStakedValueIcon,
  FarmHeadCardOperationPanel,
  // CardViewIcon,
  // ListViewIcon,
  SearchInputBox,
  SearchIcon,
  SearchInputWrapper,
  ActiveFinishButtons,
  // StyledSelect,
  FarmHeadCardEarningPanelWrapper,
  FarmHeadCardEarningPanel,
  // FarmHeaderCardEarningDivider,
  // GearIcon,
  HeadCardOperationPanelWrapper,
  StyledPage,
  StyledIconPendingRewards,
  StyledIconTotalStaked,
  Crss2sCrssConverterWrapper,
  CRSSAmountInput,
  CRSSInputWrapper,
  CRSSInputLabel,
  CRSSIcon,
  SwapIcon,
  SCRSSIcon,
  ToolTipText,
  FillMaxButton,
  ConverterContainer,
} from './styled'
import Page from '../Page'
import { TabMenuWrapper } from '../Trade/shared'
import { useCrssBalance, useEstimateCrssOutput, useEstimateSCrssOutput, useSCrssBalance } from './hooks/useCrssBalance'
import { useSCrssAllowance, useSCrssApprove } from './hooks/useApproveCrss'
import { useConvert2Crss, useConvert2SCrss } from './hooks/useConvertCrss'

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
  const { data: farmsLP, userDataLoaded } = useFarms()
  const crssPrice = usePriceCrssBusd()
  const [, setCrssTokenPrice] = useState(new BigNumber(0))

  // const [farmTvl, setFarmTvl] = useState(new BigNumber(0));
  // const [totalTvl, setTotalTvl] = useState(new BigNumber(0));
  // const totalTvl = useTVL()
  // const farmTvltmp = useFarmTvl()
  // const userStakedVal = useUserFarmStaked()
  const [totalPendingCrss, setTotalPendingCrss] = useState(0)
  const [totalStaked, setTotalStaked] = useState(0)
  const [crssTokenEarned, setCrssTokenEarned] = useState<number>(0)
  const [pendingTx, setPendingTx] = useState(false)

  const [query, setQuery] = useState('')
  const [headCardExpanded, setHeadCardExpanded] = useState(true)
  // const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'crosswise_farm_view' })
  const {
    account,
    active,
    // library
  } = useWeb3React()

  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)
  // const [vesting, setVesting] = useState(true)
  // const [autoCompound, setAutoCompound] = useState(true)
  // const { onMassHarvest, onMassStakeReward } = useMassFarm()

  const { onMassHarvest } = useMassFarm()
  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

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
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight), crssPrice, totalLiquidity, farm.lpAddresses[ChainId.TESTNET])
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [crssPrice, query, isActive],
  )

  // const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(event.target.value)
  // }

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

  useEffect(() => {
    let totalStakedValue = 0
    let totalEarnedValue = BIG_ZERO
    let totalPendingValue = BIG_ZERO
    farmsLP.forEach((farm: any) => {
      const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
      totalStakedValue += totalLiquidity.toNumber() || 0

      const {
        userData: { accumulatedRewards, pendingCrss },
      } = farm
      totalEarnedValue = totalEarnedValue.plus(new BigNumber(accumulatedRewards || '0'))
      totalPendingValue = totalPendingValue.plus(new BigNumber(pendingCrss || '0'))
    })
    setTotalStaked(totalStakedValue)
    setCrssTokenEarned(getBalanceNumber(totalEarnedValue))
    setTotalPendingCrss(getBalanceNumber(totalPendingValue))
  }, [farmsLP])

  // const activePids = useMemo(() => {
  //   let activeFarmPids = []
  //   activeFarmPids = stakedOnlyFarms.map((farm) => farm.pid)
  //   return activeFarmPids
  // }, [stakedOnlyFarms])

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

    // let temp = new BigNumber(0)
    // const getStakedVal = () => {
    //   chosenFarmsMemoized.map((farm) => {
    //     // const lpPrice = useLpTokenPrice(farm.lpSymbol)
    //     temp = temp.plus(farm.userData?.earnings)
    //     return temp
    //   })
    //   if (!crssPrice.isNaN()) {
    //     setCrssTokenEarned(getBalanceNumber(temp.times(crssPrice).dividedBy(2)))
    //   }
    // }
    // getStakedVal()
  }, [chosenFarmsMemoized, observerIsSet])

  useEffect(() => {
    setCrssTokenPrice(crssPrice)
  }, [crssPrice])

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

  // const handleMassStakeReward = async () => {
  //   setPendingTx(true)
  //   await onMassStakeReward(library, activePids)
  //   // const resp = await onMassStakeReward(library, activePids)
  //   setPendingTx(false)
  // }

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    // const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('CROSSWISE', '')
    const lpLabel = farm.lpSymbol && farm.lpSymbol.replace(/ LP /g, ' ').toUpperCase().replace('CROSSWISE', '')
    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        // multiplier: farm.multiplier,
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
        // pid: farm.pid,
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
        // pid: farm.pid,
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

  // const handleSortOptionChange = (option: OptionProps): void => {
  //   setSortOption(option.value)
  // }

  // const handleToggle = (mode: ViewMode) => {
  //   if (viewMode !== mode) {
  //     setViewMode(mode)
  //   }
  // }

  const handleItemClick = (index: number) => {
    if (index !== 0) {
      history.push('/pools')
    }
  }

  const handleClickFarmHeadCardHeader = () => {
    setHeadCardExpanded(!headCardExpanded)
  }

  const handleChangeSearchInput = (e) => {
    const {
      target: { value: searchValue },
    } = e
    setQuery(searchValue)
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
        checked={isActive}
        onClick={() => history.push(url)}
        width="70px"
      >
        Active
      </ActiveFinishButtons>
      <ActiveFinishButtons
        scale="xs"
        variant="primaryGradientOutline"
        checked={isInactive}
        onClick={() => history.push(`${url}/history`)}
        width="70px"
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

  const crssBalance = useCrssBalance()
  const sCrssBalance = useSCrssBalance()
  const crssAllowance = useSCrssAllowance()

  const [isCrss, setIsCrss] = useState(1)
  const [crssInputsAmount, setCrssInputsAmount] = useState(0)
  const [sCrssInputsAmount, setSCrssInputsAmount] = useState(0)

  const { estimateSCrssOutput } = useEstimateSCrssOutput(crssInputsAmount)
  const { estimateCrssOutput } = useEstimateCrssOutput(sCrssInputsAmount)
  const { convert2SCrss } = useConvert2SCrss(crssInputsAmount)
  const { convert2Crss } = useConvert2Crss(sCrssInputsAmount)
  const { approveSCrss } = useSCrssApprove()

  useEffect(() => {
    if (isCrss) {
      const handleChangeCrssInput = debounce(() => {
        estimateSCrssOutput().then((result) => {
          setSCrssInputsAmount(result)
        })
      }, 500)
      handleChangeCrssInput()
    }
    // eslint-disable-next-line
  }, [estimateSCrssOutput, isCrss])

  useEffect(() => {
    if (isCrss === 0) {
      const handleChangeCrssInput = debounce(() => {
        estimateCrssOutput().then((result) => {
          setCrssInputsAmount(result)
        })
      }, 500)
      handleChangeCrssInput()
    }
    // eslint-disable-next-line
  }, [estimateCrssOutput, isCrss])

  const crssPair = [
    <CRSSInputWrapper>
      <CRSSAmountInput
        onChange={(e) => {
          setCrssInputsAmount(e.target.value || 0)
        }}
        placeholder="0"
        readOnly={isCrss === 0}
        value={crssInputsAmount}
      />
      <CRSSIcon />
      <CRSSInputLabel>CRSS</CRSSInputLabel>
      {active && (
        <Flex px="2px" mt="3px" justifyContent="space-between" alignItems="center">
          <PreTitle my="3px">Balance: {crssBalance}</PreTitle>
          {isCrss === 1 && (
            <FillMaxButton
              onClick={() => {
                setCrssInputsAmount(crssBalance)
              }}
            >
              Max
            </FillMaxButton>
          )}
        </Flex>
      )}
    </CRSSInputWrapper>,

    <CRSSInputWrapper>
      <CRSSAmountInput
        onChange={(e) => {
          setSCrssInputsAmount(e.target.value || 0)
        }}
        placeholder="0"
        readOnly={isCrss === 1}
        value={sCrssInputsAmount}
      />
      <SCRSSIcon />
      <CRSSInputLabel>sCRSS</CRSSInputLabel>
      {active && (
        <Flex px="2px" mt="3px" justifyContent="space-between" alignItems="center">
          <PreTitle my="3px">Balance: {sCrssBalance}</PreTitle>
          {isCrss === 0 && (
            <FillMaxButton
              onClick={() => {
                setSCrssInputsAmount(sCrssBalance)
              }}
            >
              Max
            </FillMaxButton>
          )}
        </Flex>
      )}
    </CRSSInputWrapper>,
  ]

  const Crss2sCrssConverterContainer: JSX.Element = (
    <Crss2sCrssConverterWrapper isMobile={isMobile}>
      <ConverterContainer isMobile={isMobile}>
        <Flex flexDirection="column" alignItems="center" mx="5rem" my="1rem">
          <BodyFont my="3px">CRSS Vault</BodyFont>
          <Flex>
            <PreTitle>{t('APR')}</PreTitle>

            <QuestionHelper
              text={
                <ToolTipText>
                  sCRSS holders receive a share of almost all platform fees on a given network. For a full fee breakdown
                  please check our{' '}
                  <a target="_blank" rel="noreferrer" href="https://crosswise.gitbook.io/crosswise-docs/">
                    CrossDocs
                  </a>
                </ToolTipText>
              }
              ml="4px"
            />
          </Flex>
          <PreTitle mt="4px">12.00%</PreTitle>
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          {crssPair[1 - isCrss]}
        </Flex>
        <SwapIcon
          onClick={() => {
            setIsCrss(1 - isCrss)
          }}
        />
        <Flex flexDirection="column" justifyContent="center">
          {crssPair[isCrss]}
        </Flex>

        <ActiveFinishButtons
          scale="md"
          variant="primaryGradientOutline"
          mr={10}
          onClick={() => {
            if (crssAllowance.gte(ethers.utils.parseEther(crssInputsAmount.toString()))) {
              if (isCrss) convert2SCrss()
              else convert2Crss()
            } else {
              approveSCrss()
            }
          }}
        >
          {crssAllowance.gte(ethers.utils.parseEther(crssInputsAmount.toString())) ? 'Convert' : 'Approve CRSS'}
        </ActiveFinishButtons>
      </ConverterContainer>
    </Crss2sCrssConverterWrapper>
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

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} account={account} />
    }
    return null
  }

  const BtnMassHarvest = (): JSX.Element => (
    <MassBtns>
      <Button
        variant="primaryGradient"
        onClick={account ? () => handleMassHarvest() : null}
        disabled={!account}
        isLoading={pendingTx}
      >
        {t('Mass Harvest')}
      </Button>
    </MassBtns>
  )

  return (
    <Page title={t('Space Farms')} subTitle={t('Stake LP tokens to earn CRSS or LP tokens')}>
      <FarmHeaderLayout>
        <TabMenuWrapper>
          <TabMenu activeIndex={0} onItemClick={handleItemClick} fullWidth>
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
                {t('Farm Stats')}
              </BodyFont>
            </FarmHeadCardTitle>
            {/* <DropDownUpIcon /> */}
            <ExpandableButton direction={headCardExpanded ? 'up' : 'down'} />
          </FarmHeadCardHeader>

          <Collapse isOpen={isMobile || headCardExpanded}>
            <Flex
              justifyContent="space-evenly"
              // flexDirection={isXs ? 'column' : 'row'}
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
                  {/* {isMobile && <TotalStakedValueIcon />} */}
                  <StyledIconTotalStaked />
                  <PreTitle mt="8px">{t('Total Staked')}</PreTitle>
                </Flex>
                <BodyFont my="3px">{`${insertThousandSeparator(totalStaked.toFixed(2))} USD`}</BodyFont>
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
                  <PreTitle mt="8px">{t('Pending Rewards')}</PreTitle>
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

      {Crss2sCrssConverterContainer}

      {HeadCardOperationPanelContainer}
      <StyledPage>
        {renderContent()}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={loadMoreRef} />
      </StyledPage>
    </Page>
  )
}

export default Farms
