import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, Flex } from '@crosswiselabs/uikit'
// import { ModalActions, ModalInput } from 'components/Modal'
import { Panel, TransparentInput } from 'components/ApyCalculatorModal/styled'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import { FieldLabel } from 'style/typography'

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      // if (e.currentTarget.validity.valid) {
      //   setVal(e.currentTarget.value.replace(/,/g, '.'))
      // }
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={t('Unstake')} onDismiss={onDismiss} width="346px">
      <Panel flexDirection="column">
        <Flex justifyContent="space-between" mb="8px">
          <FieldLabel>{t('Unstake')}</FieldLabel>
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
          <Button variant="primaryGradientOutline" scale="xs" padding="0px 12px" ml="auto" onClick={handleSelectMax}>
            {t('MAX')}
          </Button>
        </Flex>
      </Panel>
      <Flex mt="24px">
        <Button variant="secondaryGradient" onClick={onDismiss} width="100%" mr="20px" disabled={pendingTx}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onConfirm(val)
              toastSuccess(t('Unstaked!'), t('Your earnings have also been harvested to your wallet'))
              onDismiss()
            } catch (e: any) {
              toastError(t('Error'), e)
              console.error(e)
            } finally {
              setPendingTx(false)
            }
          }}
          variant="primaryGradient"
          width="100%"
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      </Flex>
    </Modal>
  )
}

export default WithdrawModal
