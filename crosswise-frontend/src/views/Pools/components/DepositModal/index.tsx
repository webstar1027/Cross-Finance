import React, { useCallback, useMemo, useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Modal, Link, SectorIcon } from '@crosswiselabs/uikit'
import { usePools } from 'state/pools/hooks'
import useTokenPrice from 'hooks/useTokenPrice'
import useTheme from 'hooks/useTheme'
import { usdEarnedCompounding } from 'utils/compoundApyHelpers'
// import { ModalActions, ModalInput, ExpandButton } from 'components/Modal'
import { ModalActions, ExpandButton } from 'components/Modal'
import { Panel, TransparentInput } from 'components/ApyCalculatorModal/styled'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
// import { Farm } from 'state/types'
import { BodyFont, FieldLabel } from 'style/typography'
// import { usePriceCrssBusd } from 'state/farms/hooks'
import {
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
  addTokenUrl?: string
}

const DepositModal: React.FC<DepositModalProps> = ({ max, apr, onConfirm, onDismiss, tokenName = '', addTokenUrl }) => {
  const { theme } = useTheme()
  const [val, setVal] = useState('')
  const [roiAtCurrentRate, setRoiAtCurrentRate] = useState(0)
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  // const crssPriceUsd = usePriceCrssBusd()

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const { data: farms } = usePools()
  const selectedFarm = farms.find((item) => item?.lpSymbol?.toLowerCase() === tokenName.toLowerCase())
  const lpPriceInUsd = useTokenPrice(selectedFarm.token)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      // console.log(e.currentTarget.validity.valid)
      // if (e.currentTarget.validity.valid) {
      setVal(e.currentTarget.value)
      // }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  useEffect(() => {
    const valueInUSD = lpPriceInUsd * Number(val)
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
      title={t('Stake Single Assets')}
      icon={<SectorIcon color={theme.isDark ? 'contrast' : 'bluePalette.accent'} />}
      width="346px"
      onDismiss={onDismiss}
    >
      <ModalNoPadContainer>
        <ModalContainer>
          <Panel flexDirection="column">
            <Flex justifyContent="space-between" mb="8px">
              <FieldLabel>{t('Stake')}</FieldLabel>
              <FieldLabel textAlign="right">
                {t('Balance: ')}
                {fullBalance}
              </FieldLabel>
            </Flex>
            <TransparentInput
              type="number"
              placeholder="0.00"
              value={val}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
            <Flex alignItems="center">
              <FieldLabel>{tokenName}</FieldLabel>
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
                addTokenUrl={addTokenUrl}
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
                  console.error(e)
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

        <Link href={addTokenUrl} target="_blank" style={{ alignSelf: 'center', width: '100%' }}>
          <ExpandButton width="100%" title={t('Get %symbol%', { symbol: tokenName })} />
        </Link>
      </ModalNoPadContainer>
    </Modal>
  )
}

export default DepositModal
