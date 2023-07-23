import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { orderBy } from 'lodash'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useMatchBreakpoints, Flex, Text, useModal, Skeleton, ExpandableButton, Button } from '@crosswiselabs/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { useFarmUser, usePriceCrssBusd } from 'state/farms/hooks'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useThemeManager } from 'state/user/hooks'
import { AutoOption } from 'state/farms/fetchFarmUser'
import { TokenPairImage } from 'components/TokenImage'
import ConnectWalletButton from 'components/ConnectWalletButton'
import UnclaimedRewardsModal from 'components/UnclaimedRewardsModal'
import HarvestModal from 'components/HarvestModal'
// import SettingModal from 'components/SettingsModal'
import SaveIconButton from 'components/SaveIconButton'
import ExpandButton from 'components/ExpandButton'
import useTheme from 'hooks/useTheme'
import { useERC20 } from 'hooks/useContract'
// import useDelayedUnmount from 'hooks/useDelayedUnmount'
import useToast from 'hooks/useToast'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { formatDate, getDate } from 'utils/formatDate'
import { BASE_ADD_LIQUIDITY_URL, BASE_BSC_SCAN_URL } from 'config'
import QuestionHelper from 'components/QuestionHelper'
import { BodyFont, ButtonText, PreTitle, SmallTitle, SmallCopy, FieldLabel } from 'style/typography'
import Collapse from 'components/Collapse'
import { HorizontalDivider } from 'components/Divider'
import Apr, { AprProps } from '../Apr'
import { FarmProps } from '../Farm'
import { EarnedProps } from '../Earned'
import { DepositFeeProps } from '../DepositFee'
import Multiplier, { MultiplierProps } from '../Multiplier'
import { LiquidityProps } from '../Liquidity'
import Staked, { StakedProps } from '../Staked'
import { FarmOptionProps } from '../FarmOption'
// import ActionPanel from '../Actions/ActionPanel'
import CellLayout from '../CellLayout'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import useApproveFarm from '../../../hooks/useApproveFarm'
import useStakeFarms from '../../../hooks/useStakeFarms'
import useUnstakeFarms from '../../../hooks/useUnstakeFarms'
import useSwitchCollectOption from '../../../hooks/useSwitchCollectOption'
import useClaimFarm from '../../../hooks/useClaimFarm'
import useHarvestFarm from '../../../hooks/useHarvestFarm'

import {
  Wrapper,
  CellInner,
  StyledTr,
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
  LockIcon,
  FirstColumn,
  LastColumn,
} from './styled'

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
  const farmNameElement = useRef(null)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const [isDark] = useThemeManager()
  const { details, index, farm, multiplier, account, liquidity, apr, userDataReady, farmOption } = props // props has userDataReady
  const { pid, apr: aprAsNumber, lpSymbol, quoteToken, token, isLock, withdrawLock } = details

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
    depositList: rawDepositList,
  } = useFarmUser(pid)
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

  // const farmNameELementWidth = farmNameElement.current?.offsetWidth || 0

  const lpAddress = getAddress(details.lpAddresses)
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const bscScanUrl = `${BASE_BSC_SCAN_URL}/address/${lpAddress}`
  const lpContract = useERC20(lpAddress)
  const dispatch = useAppDispatch()
  const { onApprove } = useApproveFarm(lpContract)

  // const shouldRenderChild = useDelayedUnmount(true, 300)
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const { isXs, isSm } = useMatchBreakpoints()

  const isMobile = isXs || isSm

  const displayLiquidity =
    liquidity && liquidity.liquidity?.gt(0)
      ? `${liquidity.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })} USD`
      : '0 USD'

  const earnings = new BigNumber(earningsAsString)
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const crssPrice = usePriceCrssBusd()
  const earningsBusd = rawEarningsBalance
    ? rawEarningsBalance.multipliedBy(crssPrice).toFixed(3, BigNumber.ROUND_DOWN)
    : 0

  // NOTE: vested == claimed
  const rawVestedRewards = Number.isNaN(accumulatedRewardsAsString.toNumber())
    ? BIG_ZERO
    : getBalanceAmount(accumulatedRewardsAsString)
  const vestedRewardsDisplay = rawVestedRewards.toFixed(2)
  const vestedRewardsBusd = rawVestedRewards.multipliedBy(crssPrice).toFixed(2)

  const rawPendingCrss = Number.isNaN(pendingCrssAsString.toNumber()) ? BIG_ZERO : getBalanceAmount(pendingCrssAsString)
  const pendingCrssDisplay = rawPendingCrss.toFixed(2)
  const pendingCrssBusd = rawPendingCrss.multipliedBy(crssPrice).toFixed(2)
  const depositList = rawDepositList.map((depositListItem) => ({
    amount: new BigNumber(depositListItem.amount),
    depositAt: new Date(+depositListItem.depositAt * 1000),
  }))

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
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))

      setRequestedApproval(false)
    } catch (e: any) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  const handleStake = async (amount: string) => {
    // Deposit with referrer link
    await onStake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleSwitchCollectionOption = async ({ isVesting, autoCompound }) => {
    if (isAuto === autoCompound && isVest === isVesting) return
    setPendingTx(true)
    const value = AutoOption.findIndex((item) => item.autoCompound === autoCompound && item.isVesting === isVesting)
    try {
      await onSwitchCollectOption(value)
      toastSuccess('Success', 'Farm settings updated.')
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
    } catch (err: any) {
      toastError('Error', err)
    } finally {
      setPendingTx(false)
    }
  }
  const handleClaimRewards = async () => {
    await onClaimFarm()
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleHarvestStake = async () => {
    await onHarvestStake()
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleHarvestWithdraw = async () => {
    await onHarvestWithdraw()
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  // const handleVestWithdraw = async () => {
  //   setPendingTx(true)
  //   try {
  //     await onVestWithdraw(totalWithdrawable.toFixed())
  //     toastSuccess(t('Success!'), t('Successfully withdraw vest.'))
  //   } catch (e: any) {
  //     toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
  //     console.error(e)
  //   } finally {
  //     setPendingTx(false)
  //   }
  // }

  const lpSymbolNoLock = useMemo(() => {
    if (!isLock) return lpSymbol

    return lpSymbol.slice(0, -1 * t('Lock').length)
  }, [isLock, lpSymbol, t])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      apr={aprAsNumber}
      onConfirm={handleStake}
      tokenName={lpSymbolNoLock}
      addLiquidityUrl={addLiquidityUrl}
      isLock={isLock}
      withdrawLock={withdrawLock}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalanceAsString}
      onConfirm={handleUnstake}
      tokenName={lpSymbolNoLock}
      depositList={depositList}
      withdrawLock={details.withdrawLock}
    />,
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
    <FirstColumn
      isMobile={isMobile}
      flexDirection={isMobile ? 'row' : 'column'}
      justifyContent={isMobile && 'space-between'}
    >
      <StyledLinkExternal isMobile={isMobile} href={addLiquidityUrl}>
        <SmallCopy>Get LP</SmallCopy>
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
        {/* <Text>{`Vesting ${isVest ? 'On' : 'Off'}`}</Text>
            <Text>{`Auto-compound ${isAuto ? 'On' : 'Off'}`}</Text> */}
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

  // const test = () => {
  //   toastSuccess('Success', 'Success Description')
  //   toastError('Error', 'Error Description')
  //   toastInfo('Info', 'Info Description')
  //   toastWarning('Warning', 'Warning Toast')
  // }
  return (
    <Wrapper>
      <StyledTr isLock={isLock} index={index} isMobile={isMobile}>
        <RowBody isMobile={isMobile} onClick={() => setShowMainInfo(!showMainInfo)}>
          <FirstColumn ref={farmNameElement} isMobile={isMobile} flexDirection="column" mb={isMobile ? 10 : 0}>
            <Flex alignItems="center">
              <TokenWrapper>
                <TokenPairImage primaryToken={farm.token} secondaryToken={farm.quoteToken} width={40} height={40} />
              </TokenWrapper>
              <BodyFont fontWeight="bold">{farm.label}</BodyFont>
              <Multiplier {...multiplier} />
              {isLock && <LockIcon />}
            </Flex>
            <PreTitle>{`${displayLiquidity} Liquidity`}</PreTitle>
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
          <CellInner>
            <CellLayout label={farmOption.isAuto ? 'APY' : 'APR'}>
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
                      disabled={!account || earnings.eq(accumulatedRewardsAsString)}
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

          {isLock && (
            <>
              <HorizontalDivider />
              <RowBody columnsTemplate="1fr" isMobile={isMobile}>
                <BodyFont width="100%" textAlign="center" mr={10}>
                  {`Earn even higher rewards in return for locking your liquidity for ${getDate(
                    Number(withdrawLock) * 1000,
                  )}.`}
                </BodyFont>
              </RowBody>
            </>
          )}

          <HorizontalDivider />

          {/* <RowBody> */}
          <Flex flexDirection="column" alignItems="center" p={20} mb={20}>
            {/* <Flex flexDirection="column" justifyContent="center" alignItems="center"> */}
            <EarningRow isMobile={isMobile}>
              <FirstColumn isMobile={isMobile}>
                <Flex flexDirection="row">
                  <PreTitle>Vested</PreTitle>
                  <QuestionHelper ml="10px" text="These rewards are ready to withdraw or use." />
                </Flex>
              </FirstColumn>
              {/* <Flex flexDirection="column" alignItems="center" mt={10} mb={10}>
              <Text>{userDataReady ? `${vestedRewardsDisplay} CRSS` : <Skeleton width={60} />}</Text>
              <Text mt="5px">{userDataReady ? `~ ${vestedRewardsBusd} USD` : <Skeleton width={60} />}</Text>
            </Flex> */}
              {renderRewardsItem(vestedRewardsDisplay, vestedRewardsBusd)}
              <LastColumn isMobile={isMobile}>
                <ActionButton
                  variant="primaryGradient"
                  onClick={onPresentHarvestModal}
                  disabled={rawVestedRewards.eq(0)}
                  // {...(isMobile && { width: '100%' })}
                >
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
              {/* <Flex flexDirection="column" alignItems="center" mt={10} mb={10}>
              <Text>{userDataReady ? `${pendingCrssDisplay} CRSS` : <Skeleton width={60} />}</Text>
              <Text mt="5px">{userDataReady ? `~ ${pendingCrssBusd} USD` : <Skeleton width={60} />}</Text>
            </Flex> */}
              {renderRewardsItem(pendingCrssDisplay, pendingCrssBusd)}
              <LastColumn isMobile={isMobile}>
                <ActionButton
                  variant="primaryGradient"
                  onClick={onPresentUnclaimedRewardsModal}
                  disabled={rawPendingCrss.eq(0)}
                  // {...(isMobile && { width: '100%' })}
                >
                  Claim
                </ActionButton>
              </LastColumn>
            </EarningRow>
            {/* </Flex> */}
            {/* <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            onClick={() => setShowVestingList(!!vestingList && vestingList.length > 0 && !showVestingList)}
          > */}
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
              {/* <Flex flexDirection="column" alignItems="center" mt={10} mb={10}>
              <Text>{userDataReady ? `${getBalanceNumber(vestingRewards)} CRSS` : <Skeleton width={60} />}</Text>
              <Text mt="5px">
                {userDataReady ? `~ ${getBalanceNumber(vestingRewardsBusd)} USD` : <Skeleton width={60} />}
              </Text>
            </Flex> */}
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
              {/* <Flex justifyContent="space-evenly" alignItems="center">
              <Flex flexDirection="column" alignItems="center">
                <Text>Next Unlock</Text>
                <Text>
                  {userDataReady ? Number(latestDate) ? formatDate(latestDate) : 'None' : <Skeleton width={60} />}
                </Text>
              </Flex>
              <ActionButton
                ml={20}
                variant="primaryGradient"
                disabled={totalWithdrawable.eq(0) || pendingTx}
                onClick={handleVestWithdraw}
              >
                Vest Withdraw
              </ActionButton>
            </Flex> */}
            </EarningRow>
            {/* </Flex> */}
          </Flex>
          {/* </RowBody> */}

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
                const principalBusd = getBalanceNumber(principalAmount.multipliedBy(crssPrice)).toFixed(
                  isMobile ? 0 : 2,
                )
                // const withdrawn = getBalanceNumber(new BigNumber(vestingItem.withdrawn))
                // const withdrawable = getBalanceNumber(new BigNumber(vestingItem.withdrawableAmount))
                const startDate = new Date(+vestingItem.startTime * 1000)

                return (
                  <VestingListTableRow key={vestingItem.startTime}>
                    <VestingListTableCell textAlign="left" color={isDark ? 'success' : 'black'}>
                      {formatDate(startDate)}
                    </VestingListTableCell>
                    <VestingListTableCell>{`${principal} CRSS`}</VestingListTableCell>
                    <VestingListTableCell>{`~ ${principalBusd} USD`}</VestingListTableCell>
                    {/* <VestingListTableCell>{withdrawn}</VestingListTableCell>
                <VestingListTableCell>{withdrawable}</VestingListTableCell> */}
                    {/* <VestingListTableCell>{vestingItem.nextWithdrawableDate}</VestingListTableCell> */}
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
    </Wrapper>
  )
}

export default Row
