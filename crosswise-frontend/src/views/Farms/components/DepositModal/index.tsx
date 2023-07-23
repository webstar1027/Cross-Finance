import React, { useCallback, useMemo, useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Text, Flex, Link, RewardsIcon } from '@crosswiselabs/uikit'
import { useFarms, usePriceCrssBusd } from 'state/farms/hooks'
import useLpPrice from 'hooks/useLpPrice'
import useTheme from 'hooks/useTheme'
import { usdEarnedCompounding } from 'utils/compoundApyHelpers'
import { getDate } from 'utils/formatDate'
// import { ModalActions, ModalInput, ExpandButton } from 'components/Modal'
import { ModalActions, ExpandButton } from 'components/Modal'
import { Panel, TransparentInput } from 'components/ApyCalculatorModal/styled'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import { BodyFont, FieldLabel, PreTitle } from 'style/typography'
// import { Farm } from 'state/types'
import {
  StyledModal as Modal,
  ModalNoPadContainer,
  ModalContainer,
  // ModalHeader
} from './styled'
import ApyButton from '../FarmCard/ApyButton'

interface DepositModalProps {
  max: BigNumber
  apr?: number
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  addLiquidityUrl?: string
  isLock?: boolean
  withdrawLock?: string
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  apr,
  onConfirm,
  onDismiss,
  tokenName = '',
  addLiquidityUrl,
  isLock,
  withdrawLock,
}) => {
  const { theme } = useTheme()
  const [val, setVal] = useState('')
  const [roiAtCurrentRate, setRoiAtCurrentRate] = useState(0)
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, undefined, 2)
  }, [max])

  const crssPriceUsd = usePriceCrssBusd()

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const { data: farms } = useFarms()
  const selectedFarm = farms.find((item) => item?.lpSymbol?.toLowerCase() === tokenName.toLowerCase())
  const lpPriceInUsd = useLpPrice(selectedFarm)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      // if (e.currentTarget.validity.valid) {
      // setVal(e.currentTarget.value.replace(/,/g, '.'))
      setVal(e.currentTarget.value)
      // }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  useEffect(() => {
    const valueInUSD = val.length === 0 ? 0 : lpPriceInUsd.times(val).toNumber()
    const isChkCompound = selectedFarm?.userData?.isAuto || false

    const compoundOption = {
      balance: valueInUSD,
      numberOfDays: 365,
      farmApr: apr,
      roundingDecimals: 2,
      compoundFrequency: isChkCompound ? 24 * 6 : 0, // !compounding is achieved every 10 mins
      // compoundFrequency: isChkCompound ? 1 / compoundPeriod : 0,
      performanceFee: 0,
    }
    const usdEarned = usdEarnedCompounding(compoundOption)
    setRoiAtCurrentRate(usdEarned)
  }, [val, apr, selectedFarm, lpPriceInUsd])

  return (
    <Modal
      title={t('Stake LP tokens')}
      icon={<RewardsIcon color={theme.isDark ? 'contrast' : 'bluePalette.accent'} />}
      width="346px"
      onDismiss={onDismiss}
    >
      <ModalNoPadContainer>
        <ModalContainer>
          {isLock && (
            <PreTitle textAlign="justify" mb="10px">
              {`You are about to deposit into a Locked farm. Your liquidity will be locked for ${getDate(
                new Date(Number(withdrawLock) * 1000),
              )} in return for a higher yield.`}
            </PreTitle>
          )}
          <Panel flexDirection="column">
            <Flex justifyContent="space-between" mb="8px">
              <FieldLabel>{t('Stake')}</FieldLabel>
              <FieldLabel textAlign="right">
                {t('Balance: ')}
                {fullBalance}
              </FieldLabel>
            </Flex>
            <TransparentInput type="number" placeholder="0.00" value={val} onChange={handleChange} />
            <Flex justifyContent="space-between" alignItems="center">
              <FieldLabel textAlign="right">{tokenName}</FieldLabel>
              <Button
                variant="primaryGradientOutline"
                scale="xs"
                padding="0px 12px"
                ml="auto"
                onClick={handleSelectMax}
              >
                {t('MAX')}
              </Button>
            </Flex>
          </Panel>
          {/* <ModalInput
            value={val}
            onSelectMax={handleSelectMax}
            onChange={handleChange}
            max={fullBalance}
            symbol={tokenName}
            addLiquidityUrl={addLiquidityUrl}
            inputTitle={t('Stake')}
          /> */}
          <Flex flexDirection="column" mt="32px" mb="8px">
            <FieldLabel>{t('Annual ROI at current rates:')}</FieldLabel>
            <Flex alignItems="center" mt="8px">
              {/* <ApyButton
                lpLabel={tokenName}
                addLiquidityUrl={addLiquidityUrl}
                // crssPrice={crssPriceUsd}
                apr={apr}
                // displayApr={displayApr}
              /> */}
              <BodyFont ml="8px" color="primaryGray">
                {Number.isNaN(roiAtCurrentRate)
                  ? '0'
                  : roiAtCurrentRate.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </BodyFont>
            </Flex>
          </Flex>
          <ModalActions>
            <Button
              width="100%"
              disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
              onClick={async () => {
                setPendingTx(true)
                try {
                  await onConfirm(val)
                  toastSuccess(t('Staked!'), t('Your funds have been staked in the farm'))
                  onDismiss()
                } catch (e: any) {
                  toastError(t('Error'), e)
                } finally {
                  setPendingTx(false)
                }
              }}
              variant="primaryGradient"
            >
              {pendingTx ? t('Confirming') : t('Confirm')}
            </Button>
          </ModalActions>
        </ModalContainer>

        <Link href={addLiquidityUrl} target="_blank" style={{ alignSelf: 'center', width: '100%' }}>
          <ExpandButton width="100%" title={t('Get %symbol%', { symbol: tokenName })} />
        </Link>
      </ModalNoPadContainer>
    </Modal>
  )
}

export default DepositModal
