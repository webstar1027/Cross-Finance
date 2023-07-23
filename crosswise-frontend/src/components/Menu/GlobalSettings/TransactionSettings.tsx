import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { Text, Input, Flex, Box } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance, useUserTransactionTTL } from 'state/user/hooks'
import { FieldLabel } from 'style/typography'
import QuestionHelper from '../../QuestionHelper'
import { SlippageError, DeadlineError } from './enums'
import { Divider, SlippageButton, StyledInput } from './styled'
import Mark from './Svgs/Mark'

const SlippageTabs = () => {
  const { isDark } = useTheme()
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [ttl, setTtl] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()

  const slippageInputIsValid =
    slippageInput === '' || (userSlippageTolerance / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (ttl / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  const parseCustomSlippage = (value: string) => {
    setSlippageInput(value)

    try {
      const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
      if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
        setUserslippageTolerance(valueAsIntFromRoundedFloat)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" px="25px" py="20px">
        <Flex mb="12px" alignItems="center">
          <Mark color={isDark ? 'contrast' : 'primary'} />
          <FieldLabel ml="2">{t('Slippage Tolerance')}</FieldLabel>

          <QuestionHelper
            text={t(
              'This sets how much of a downward price change you are willing to accept. Setting a high slippage tolerance enhances the likelihood of your transaction succeeding during times of price volatility, but you may receive less tokens. Use with caution.',
            )}
            ml="auto"
          />
        </Flex>
        <Flex justifyContent="space-between">
          <SlippageButton
            variant="primaryGradientOutline"
            onClick={() => {
              setSlippageInput('')
              setUserslippageTolerance(10)
            }}
          >
            <Text>0.1%</Text>
          </SlippageButton>
          <SlippageButton
            variant="primaryGradientOutline"
            onClick={() => {
              setSlippageInput('')
              setUserslippageTolerance(50)
            }}
          >
            <Text>0.5%</Text>
          </SlippageButton>
          <SlippageButton
            variant="primaryGradientOutline"
            onClick={() => {
              setSlippageInput('')
              setUserslippageTolerance(100)
            }}
          >
            <Text>1%</Text>
          </SlippageButton>
          <StyledInput
            scale="lg"
            placeholder={`${(userSlippageTolerance / 100).toFixed(2)}%`}
            value={slippageInput}
            onBlur={() => {
              parseCustomSlippage(`${(userSlippageTolerance / 100).toFixed(2)}%`)
            }}
            onChange={(e) => parseCustomSlippage(e.target.value)}
            isWarning={!slippageInputIsValid}
            isSuccess={![10, 50, 100].includes(userSlippageTolerance)}
          />
        </Flex>
        {!!slippageError && (
          <Text fontSize="13px" color={slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E'} mt="8px">
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </Text>
        )}
      </Flex>
      <Divider />
      <Flex flexDirection="column" px="25px" py="20px">
        <Flex mb="12px" alignItems="center">
          <Mark color={isDark ? 'contrast' : 'primary'} />
          <FieldLabel ml="2">{t('TX deadline')}</FieldLabel>
        </Flex>
        <Flex>
          <Box width="180px" mt="4px">
            <StyledInput
              scale="lg"
              color={deadlineError ? 'red' : undefined}
              onBlur={() => {
                parseCustomDeadline(`${(ttl / 60).toString()} Minutes`)
              }}
              placeholder={`${(ttl / 60).toString()} Minutes`}
              style={{ textAlign: 'center', fontSize: '18px' }}
              value={deadlineInput}
              onChange={(e) => parseCustomDeadline(e.target.value)}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SlippageTabs
