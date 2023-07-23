import React, { useState, useEffect, useCallback, useRef } from 'react'
import { orderBy } from 'lodash'
import { FarmWithStakedValue } from 'views/Pools/components/FarmCard/FarmCard'
import { useMatchBreakpoints, Flex, useModal, Skeleton, ExpandableButton } from '@crosswiselabs/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { usePoolUser, usePriceCrssBusd } from 'state/pools/hooks'
import { fetchPoolUserDataAsync } from 'state/pools'
// import { useThemeManager } from 'state/user/hooks'
import { AutoOption } from 'state/pools/fetchPoolUser'
import { TokenImage } from 'components/TokenImage'
import ConnectWalletButton from 'components/ConnectWalletButton'
import UnclaimedRewardsModal from 'components/UnclaimedRewardsModal'
import HarvestModal from 'components/HarvestModal'
// import SettingModal from 'components/SettingsModal'
import SaveIconButton from 'components/SaveIconButton'
import { useERC20 } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
// import useDelayedUnmount from 'hooks/useDelayedUnmount'
import useToast from 'hooks/useToast'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import { formatDate } from 'utils/formatDate'
import { BASE_EXCHANGE_URL, BASE_BSC_SCAN_URL } from 'config'
import QuestionHelper from 'components/QuestionHelper'
import { BodyFont, ButtonText, PreTitle, SmallCopy, FieldLabel } from 'style/typography'
import Collapse from 'components/Collapse'
import { HorizontalDivider } from 'components/Divider'
import ExpandButton from 'components/ExpandButton'
import {
  CellInner,
  RowBody,
  TokenWrapper,
  StyledLinkExternal,
  ActionButton,
  VestingListTable,
  VestingListTableRow,
  VestingListTableCell,
  VestingListTableHeaderCell,
  EarningRow,
  NextUnlockPanel,
  // StyledSettingIcon as SettingIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ToggleWrapper,
  StyledToggle as Toggle,
  // CrossedText,
  ExpandMainInfoButton,
  FirstColumn,
  LastColumn,
} from 'views/Farms/components/FarmTable/Row/styled'
import CellLayout from 'views/Farms/components/FarmTable/CellLayout'

import Apr, { AprProps } from '../Apr'
import { FarmProps } from '../Farm'
import { EarnedProps } from '../Earned'
import { DepositFeeProps } from '../DepositFee'
import Multiplier, { MultiplierProps } from '../Multiplier'
import { LiquidityProps } from '../Liquidity'
import Staked, { StakedProps } from '../Staked'
import { FarmOptionProps } from '../FarmOption'
// import ActionPanel from '../Actions/ActionPanel'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import useApproveFarm from '../../../hooks/useApproveFarm'
import useStakeFarms from '../../../hooks/useStakeFarms'
import useUnstakeFarms from '../../../hooks/useUnstakeFarms'
import useSwitchCollectOption from '../../../hooks/useSwitchCollectOption'
import useClaimFarm from '../../../hooks/useClaimFarm'
import useHarvestFarm from '../../../hooks/useHarvestFarm'

import { StyledTr } from './styled'

export interface RowProps {
  apr: AprProps
  farm: FarmProps
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  staked: StakedProps
  depositFee: DepositFeeProps
  farmOption: FarmOptionProps
  details: FarmWithStakedValue
  userData: {
    accumulatedRewards: number
    pendingCrss: number
    vestingRewards: number
  }
  account: string
  index?: number
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

type VestingItemType = {
  principal: BigNumber
  withdrawn: BigNumber
  withdrawableAmount: BigNumber
  startTime: any
  nextWithdrawableDate: any
  remainDate: string
}

const thirtyDays = 1000 * 60 * 60 * 24 * 30

const Row: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { theme } = useTheme()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [showVestingList, setShowVestingList] = useState(false)
  const [showMainInfo, setShowMainInfo] = useState(false)
  const [customIsAuto, setCustomIsAuto] = useState(false)
  const [customIsVest, setCustomIsVest] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const poolNameElement = useRef(null)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  // const [isDark] = useThemeManager()
  const { details, index, farm, multiplier, account, apr, userDataReady } = props // props has userDataReady
  const { pid, apr: aprAsNumber, lpSymbol, token } = details
  const {
    allowance,
    tokenBalance,
    vestingRewards,
    isAuto,
    isVest,
    earnings: earningsAsString = 0,
    stakedBalance: stakedBalanceAsString,
    accumulatedRewards: accumulatedRewardsAsString,
    pendingCrss: pendingCrssAsString,
    vestingList: rawVestingList,
  } = usePoolUser(pid)
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const { onSwitchCollectOption } = useSwitchCollectOption(pid)
  const { onClaimFarm } = useClaimFarm(pid)
  const {
    onHarvestStake,
    onHarvestWithdraw,
    // onVestWithdraw
  } = useHarvestFarm(pid)

  useEffect(() => {
    if (account) {
      setCustomIsAuto(isAuto)
      setCustomIsVest(isVest)
    } else {
      setCustomIsAuto(false)
      setCustomIsVest(false)
    }
  }, [isAuto, isVest, account])
  // const poolNameELementWidth = poolNameElement.current?.offsetWidth || 0

  const tokenAddress = getAddress(token.address)
  const addTokenUrl = `${BASE_EXCHANGE_URL}/${tokenAddress}`
  const bscScanUrl = `${BASE_BSC_SCAN_URL}/address/${tokenAddress}`
  const lpContract = useERC20(tokenAddress)
  const dispatch = useAppDispatch()
  const { onApprove } = useApproveFarm(lpContract)

  // const shouldRenderChild = useDelayedUnmount(true, 300)
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const { isXs, isSm } = useMatchBreakpoints()

  const isMobile = isXs || isSm

  // const displayLiquidity =
  //   liquidity && liquidity.liquidity?.gt(0)
  //     ? `${liquidity.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })} USD`
  //     : '0 USD'

  const earnings = new BigNumber(earningsAsString)
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const crssPrice = usePriceCrssBusd()
  const earningsBusd = rawEarningsBalance
    ? rawEarningsBalance.multipliedBy(crssPrice).toFixed(3, BigNumber.ROUND_DOWN)
    : 0

  // NOTE: vested == claimedRewards
  const rawVestedRewards = Number.isNaN(accumulatedRewardsAsString.toNumber())
    ? BIG_ZERO
    : getBalanceAmount(accumulatedRewardsAsString)
  const vestedRewardsDisplay = rawVestedRewards.toFixed(2)
  const vestedRewardsBusd = rawVestedRewards.multipliedBy(crssPrice).toFixed(2)

  const rawPendingCrss = Number.isNaN(pendingCrssAsString.toNumber()) ? BIG_ZERO : getBalanceAmount(pendingCrssAsString)
  const pendingCrssDisplay = rawPendingCrss.toFixed(2)
  const pendingCrssBusd = rawPendingCrss.multipliedBy(crssPrice).toFixed(2)

  let crrDate = null
  let crrItem: VestingItemType = {
    principal: BIG_ZERO,
    withdrawn: BIG_ZERO,
    withdrawableAmount: BIG_ZERO,
    startTime: null,
    nextWithdrawableDate: null,
    remainDate: null,
  }
  const vestingList = []
  const now = new Date()
  let totalWithdrawable = BIG_ZERO
  rawVestingList.map((vesting) => {
    // TODO: Summarize daa per 30 days after a month
    const principal = new BigNumber(vesting.principal)
    const withdrawn = new BigNumber(vesting.withdrawn)

    const startTime = +vesting.startTime * 1000
    if (!crrDate) crrDate = formatDate(new Date(startTime))
    const withdrawnCount = Math.floor((Number(now) - startTime) / thirtyDays)
    const nextWithdrawableDate = new Date(startTime)
    nextWithdrawableDate.setDate(nextWithdrawableDate.getDate() + 30 * (withdrawnCount + 1))
    // nextWithdrawableDate = formatDate(nextWithdrawableDate)
    const remainDate = Math.ceil((Number(nextWithdrawableDate) - Number(now)) / (1000 * 60 * 60 * 24))

    const withdrawableAmount = principal.multipliedBy(withdrawnCount / 5).minus(withdrawn)
    totalWithdrawable = totalWithdrawable.plus(withdrawableAmount)

    if (formatDate(new Date(startTime)) === crrDate) {
      crrItem.principal = crrItem.principal.plus(principal)
      crrItem.startTime = vesting.startTime
      crrItem.withdrawn = crrItem.withdrawn.plus(withdrawn)
      crrItem.withdrawableAmount = crrItem.withdrawableAmount.plus(withdrawableAmount)
      crrItem.nextWithdrawableDate = formatDate(nextWithdrawableDate)
      crrItem.remainDate = `${remainDate} days`
    } else {
      vestingList.push(crrItem)
      crrDate = formatDate(new Date(startTime))
      crrItem = {
        principal: BIG_ZERO,
        withdrawn: BIG_ZERO,
        withdrawableAmount: BIG_ZERO,
        startTime: null,
        nextWithdrawableDate: null,
        remainDate: null,
      }
    }
    return true
  })
  if (crrItem.startTime) vestingList.push(crrItem)

  const vestingRewardsBusd = vestingRewards.multipliedBy(crssPrice)

  const orderedVestingList = orderBy(vestingList, 'startTime', 'desc')

  const nowDate = Number(new Date())
  const orderedVestingListByDate = orderBy(
    vestingList,
    (vesting) => {
      return (nowDate - +vesting.startTime * 1000) % thirtyDays
    },
    'desc',
  )
  let latestDateAsNumber = +orderedVestingListByDate[0]?.startTime * 1000
  latestDateAsNumber += latestDateAsNumber ? Math.ceil((nowDate - latestDateAsNumber) / thirtyDays) * thirtyDays : 0
  const latestDate = new Date(latestDateAsNumber)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))

      setRequestedApproval(false)
    } catch (e: any) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  const handleStake = async (amount: string) => {
    await onStake(amount)
    // console.log('result: ', result)
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  }

  const handleSwitchCollectionOption = async ({ isVesting, autoCompound }) => {
    if (isAuto === autoCompound && isVest === isVesting) return
    setPendingTx(true)
    const value = AutoOption.findIndex((item) => item.autoCompound === autoCompound && item.isVesting === isVesting)
    try {
      await onSwitchCollectOption(value)
      toastSuccess('Success', 'Pool settings updated.')
      dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
    } catch (err: any) {
      toastError('Error', err)
    } finally {
      setPendingTx(false)
    }
  }

  const handleClaimRewards = async () => {
    await onClaimFarm()
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  }

  const handleHarvestStake = async () => {
    await onHarvestStake()
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  }

  const handleHarvestWithdraw = async () => {
    await onHarvestWithdraw()
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      apr={aprAsNumber}
      onConfirm={handleStake}
      tokenName={lpSymbol}
      addTokenUrl={addTokenUrl}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalanceAsString} onConfirm={handleUnstake} tokenName={lpSymbol} />,
  )

  const [onPresentUnclaimedRewardsModal] = useModal(
    <UnclaimedRewardsModal
      pairName={farm.label}
      pendingCrss={rawPendingCrss}
      collectOption={{ isAuto, isVest }}
      onHandleClaim={handleClaimRewards}
      onHandleSetting={handleSwitchCollectionOption}
    />,
  )

  const [onPresentHarvestModal] = useModal(
    <HarvestModal
      claimedRewards={rawVestedRewards}
      onHandleHarvestStake={handleHarvestStake}
      onHandleHarvestWithdraw={handleHarvestWithdraw}
    />,
  )

  const handleSaveSetting = () => {
    if (pendingTx) return
    handleSwitchCollectionOption({ isVesting: customIsVest, autoCompound: customIsAuto })
  }

  const renderOuterLinks = () => (
    <FirstColumn flexDirection={isMobile ? 'row' : 'column'} justifyContent={isMobile && 'space-between'}>
      <StyledLinkExternal isMobile={isMobile} href={addTokenUrl}>
        <SmallCopy>Get {token.symbol}</SmallCopy>
      </StyledLinkExternal>
      <StyledLinkExternal isMobile={isMobile} href={bscScanUrl}>
        <SmallCopy>Contract</SmallCopy>
      </StyledLinkExternal>
      {/* <StyledLinkExternal href="/">Info</StyledLinkExternal> */}
    </FirstColumn>
  )

  const renderClaimOptions = () => (
    <LastColumn isMobile={isMobile} alignItems="center">
      <Flex flexDirection="column">
        <ToggleWrapper isMobile={isMobile}>
          <FieldLabel mr={10}>{t('Hyper Accelerator')}</FieldLabel>
          <Toggle
            disabled={!account || !userDataReady || pendingTx}
            // displayValueOption={{ visible: true }}
            scale="md"
            checked={customIsAuto}
            onChange={() => setCustomIsAuto(!customIsAuto)}
          />
          <QuestionHelper
            ml="10px"
            text="Turn on the Hyper Accelerator to start auto-compounding your rewards, and achieve maximum yields."
          />
        </ToggleWrapper>
      </Flex>

      {account && !(isAuto === customIsAuto && isVest === customIsVest) && (
        <SaveIconButton onClick={handleSaveSetting} />
      )}
    </LastColumn>
  )

  const renderRewardsItem = (rewardsInToken: string | number, rewardsInUsd: string | number) => {
    return isMobile ? (
      <Flex justifyContent="space-between" alignItems="center" mt="10px" mb="10px">
        <BodyFont>{userDataReady ? `${rewardsInToken} CRSS` : <Skeleton width={60} />}</BodyFont>
        <BodyFont>{userDataReady ? `~ ${rewardsInUsd} USD` : <Skeleton width={60} />}</BodyFont>
      </Flex>
    ) : (
      <>
        <BodyFont>{userDataReady ? `${rewardsInToken} CRSS` : <Skeleton width={60} />}</BodyFont>
        <BodyFont mt="5px">{userDataReady ? `~ ${rewardsInUsd} USD` : <Skeleton width={60} />}</BodyFont>
      </>
    )
  }

  return (
    <StyledTr index={index} isMobile={isMobile}>
      <RowBody isMobile={isMobile} onClick={() => setShowMainInfo(!showMainInfo)}>
        <FirstColumn ref={poolNameElement} isMobile={isMobile} flexDirection="column" mb={isMobile ? 10 : 0}>
          <Flex alignItems="center">
            <TokenWrapper>
              <TokenImage token={farm.token} width={40} height={40} />
            </TokenWrapper>
            <BodyFont fontWeight="bold">{farm.label}</BodyFont>
            <Multiplier {...multiplier} />
          </Flex>
        </FirstColumn>
        <CellInner>
          <CellLayout label="Earned">
            <Flex
              flexDirection={isMobile ? 'row' : 'column'}
              // alignItems={isMobile && 'center'}
              alignItems="center"
            >
              <BodyFont>
                {userDataReady ? (
                  `${(+displayBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })} CRSS`
                ) : (
                  <Skeleton width={60} />
                )}
              </BodyFont>
              <SmallCopy mt={!isMobile && '5px'}>
                {userDataReady ? (
                  `~ ${(+earningsBusd).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD`
                ) : (
                  <Skeleton width={60} />
                )}
              </SmallCopy>
            </Flex>
          </CellLayout>
        </CellInner>
        <CellInner alignItems="flex-start">
          <CellLayout label="APR">
            <Apr {...apr} hideButton={isMobile} />
            {/* <Apr {...props.apr} hideButton /> */}
          </CellLayout>
        </CellInner>
        <CellInner isMobile={isMobile} alignItems={isMobile && 'flex-end'} lastColumn>
          <CellLayout label="Staked" alignItems={isMobile ? 'center' : 'flex-end'}>
            <Staked farm={details} staked={stakedBalanceAsString ?? BIG_ZERO} userDataReady={userDataReady} />
          </CellLayout>
        </CellInner>
        <ExpandMainInfoButton>
          <ExpandableButton direction={showMainInfo ? 'up' : 'down'} />
        </ExpandMainInfoButton>
      </RowBody>

      <Collapse isOpen={showMainInfo}>
        <HorizontalDivider />
        <RowBody columnsTemplate="1fr 2fr 1fr" alignItems="center" isMobile={isMobile}>
          {renderOuterLinks()}
          <Flex justifyContent="center" mt={isMobile && 10} mb={isMobile && 10}>
            {account ? (
              isApproved ? (
                <>
                  <ActionButton variant="primaryGradient" onClick={onPresentDeposit}>
                    Deposit
                  </ActionButton>
                  <ActionButton
                    ml={20}
                    variant="primaryGradient"
                    disabled={!account || earnings.eq(0)}
                    onClick={onPresentWithdraw}
                  >
                    Withdraw
                  </ActionButton>
                </>
              ) : (
                <ActionButton variant="primaryGradient" disabled={requestedApproval} onClick={handleApprove}>
                  Enable
                </ActionButton>
              )
            ) : (
              <ConnectWalletButton scale="md" variant="primaryGradient" width="152px" />
            )}
          </Flex>
          {renderClaimOptions()}
        </RowBody>

        <HorizontalDivider />

        <Flex flexDirection="column" alignItems="center" p={20} mb={20}>
          <EarningRow isMobile={isMobile}>
            <FirstColumn>
              <Flex flexDirection="row">
                <PreTitle>Vested</PreTitle>
                <QuestionHelper ml="10px" text="These rewards are ready to withdraw or use." />
              </Flex>
            </FirstColumn>
            {renderRewardsItem(vestedRewardsDisplay, vestedRewardsBusd)}
            <LastColumn isMobile={isMobile}>
              <ActionButton variant="primaryGradient" onClick={onPresentHarvestModal} disabled={rawVestedRewards.eq(0)}>
                Harvest
              </ActionButton>
            </LastColumn>
          </EarningRow>
          <EarningRow isMobile={isMobile}>
            <FirstColumn isMobile={isMobile}>
              <Flex flexDirection="row">
                <PreTitle>Unclaimed</PreTitle>
                <QuestionHelper ml="10px" text="These rewards are ready to be claimed to start vesting." />
              </Flex>
            </FirstColumn>
            {renderRewardsItem(pendingCrssDisplay, pendingCrssBusd)}
            <LastColumn isMobile={isMobile}>
              <ActionButton
                variant="primaryGradient"
                onClick={onPresentUnclaimedRewardsModal}
                disabled={rawPendingCrss.eq(0)}
              >
                Claim
              </ActionButton>
            </LastColumn>
          </EarningRow>
          <EarningRow isMobile={isMobile}>
            <FirstColumn isMobile={isMobile}>
              <Flex flexDirection="row">
                <PreTitle>Vesting</PreTitle>
                <QuestionHelper
                  ml="10px"
                  text="These rewards are in the process of vesting. Once complete they will appear in your 'Vested' balance."
                />
              </Flex>
            </FirstColumn>
            {renderRewardsItem(
              getBalanceNumber(vestingRewards).toFixed(2),
              getBalanceNumber(vestingRewardsBusd).toFixed(2),
            )}
            <LastColumn isMobile={isMobile}>
              <NextUnlockPanel flexDirection="column" alignItems="center" justifyContent="center" isMobile={isMobile}>
                <ButtonText>
                  Next Unlock: {` `}
                  {userDataReady ? Number(latestDate) ? formatDate(latestDate) : 'None' : <Skeleton width={75} />}
                </ButtonText>
              </NextUnlockPanel>
            </LastColumn>
          </EarningRow>
        </Flex>

        <Collapse isOpen={showVestingList}>
          <VestingListTable isMobile={isMobile}>
            <VestingListTableRow>
              <VestingListTableHeaderCell textAlign="left">Date</VestingListTableHeaderCell>
              <VestingListTableHeaderCell>Amount Token</VestingListTableHeaderCell>
              <VestingListTableHeaderCell>Amount FIAT</VestingListTableHeaderCell>
              <VestingListTableHeaderCell textAlign="right">Duration</VestingListTableHeaderCell>
            </VestingListTableRow>
            <HorizontalDivider />
            {orderedVestingList.map((vestingItem) => {
              const principalAmount = new BigNumber(vestingItem.principal).dividedBy(5)
              const principal = getBalanceNumber(principalAmount).toFixed(isMobile ? 0 : 2)
              const principalBusd = getBalanceNumber(principalAmount.multipliedBy(crssPrice)).toFixed(isMobile ? 0 : 2)
              const startDate = new Date(+vestingItem.startTime * 1000)

              return (
                <VestingListTableRow key={vestingItem.startTime}>
                  <VestingListTableCell textAlign="left" color="success">
                    {formatDate(startDate)}
                  </VestingListTableCell>
                  <VestingListTableCell>{`${principal} CRSS`}</VestingListTableCell>
                  <VestingListTableCell>{`~ ${principalBusd} USD`}</VestingListTableCell>
                  <VestingListTableCell textAlign="right">{vestingItem.remainDate}</VestingListTableCell>
                </VestingListTableRow>
              )
            })}
          </VestingListTable>
        </Collapse>
      </Collapse>
      {showMainInfo && (
        <ExpandButton
          title={<>Vesting Details {showVestingList ? <ChevronUpIcon /> : <ChevronDownIcon />}</>}
          onClick={() => setShowVestingList(!!vestingList && vestingList.length > 0 && !showVestingList)}
          bgColor={theme.colors.backgroundAlt}
        />
      )}
    </StyledTr>
  )
}

export default Row
