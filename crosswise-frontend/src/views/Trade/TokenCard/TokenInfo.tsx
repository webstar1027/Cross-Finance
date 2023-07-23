import React, { useCallback, useEffect, useMemo, useState, lazy } from 'react'
import { Box, Flex, Text, DropDownIcon } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import { useCurrency, useAllTokens } from 'hooks/Tokens'
import { CurrencyLogo, DoubleCurrencyLogo } from 'components/Logo'
import { formatNumber } from 'utils/formatBalance'
import { SmallCopy } from 'style/typography'
import { TokenItem } from './styled'

export default function TokenInfo({ token, address, rank, percent }) {
  const { t } = useTranslation()

  const currency = useCurrency(address)

  return (
    <TokenItem alignItems="center">
      <Flex alignItems="center" flex={2}>
        <SmallCopy>{rank}</SmallCopy>
        <Flex mx="10px">
          <CurrencyLogo size="16px" currency={currency} />
        </Flex>
        <SmallCopy>{token}</SmallCopy>
      </Flex>
      <Flex alignItems="center" flex={1}>
        <DropDownIcon
          width="5px"
          color={percent >= 0 ? 'success' : 'failure'}
          transform={percent >= 0 ? 'rotate(180)' : ''}
        />
        <SmallCopy color={percent >= 0 ? 'success' : 'failure'} ml="4px">
          {formatNumber(percent, 2, 2)}%
        </SmallCopy>
      </Flex>
    </TokenItem>
  )
}
