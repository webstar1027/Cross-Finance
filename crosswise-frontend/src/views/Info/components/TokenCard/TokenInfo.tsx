import React from 'react'
import { Flex, Text, DropDownIcon } from '@crosswiselabs/uikit'
// import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import { CurrencyLogo } from 'components/Logo'
import { formatNumber } from 'utils/formatBalance'
import { TokenItem } from './styled'

export default function TokenInfo({ token, address, rank, percent }) {
  // const { t } = useTranslation()

  const currency = useCurrency(address)

  return (
    <TokenItem alignItems="center">
      <Flex alignItems="center" flex={2}>
        <Text fontSize="10px" lineHeight="12px" fontWeight="600" color="primaryGray">
          {rank}
        </Text>
        <Flex mx="10px">
          <CurrencyLogo size="16px" currency={currency} />
        </Flex>
        <Text fontSize="10px" lineHeight="12px" fontWeight="600" color="primaryGray">
          {token}
        </Text>
      </Flex>
      <Flex alignItems="center" flex={1}>
        <DropDownIcon
          width="5px"
          color={percent >= 0 ? 'success' : 'failure'}
          transform={percent >= 0 ? 'rotate(180)' : ''}
        />
        <Text fontSize="10px" lineHeight="12px" fontWeight="600" color={percent >= 0 ? 'success' : 'failure'} ml="4px">
          {formatNumber(percent, 2, 2)}%
        </Text>
      </Flex>
    </TokenItem>
  )
}
