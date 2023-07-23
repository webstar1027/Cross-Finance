import React, { useCallback, useEffect, useState } from 'react'
import { Currency, ETHER, JSBI, TokenAmount } from '@crosswise/sdk'
import { Flex, Box, Text, Modal, AddIcon, DropDownBottomIcon, useModal } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import { CurrencyLogo } from 'components/Logo'
import { MinimalPositionCard } from 'components/PositionCard'
import { IconPoolImport } from 'components/SvgIcons'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import Dots from 'components/Loader/Dots'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Transactions from 'components/App/Transactions'

import { PairState, usePair } from 'hooks/usePairs'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTheme from 'hooks/useTheme'
import { usePairAdder } from 'state/user/hooks'
import { useTokenBalance } from 'state/wallet/hooks'
import { currencyId } from 'utils/currencyId'
import { AddIconBox } from 'views/AddLiquidity/styled'
import { BodyFont, PreTitle } from 'style/typography'
import { StyledButton, StyledLightCard, StyledLink } from './styled'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

interface ImportPoolModalProps {
  onDismiss?: () => void
}

const ImportPoolModal: React.FC<ImportPoolModalProps> = ({ onDismiss }) => {
  const { theme } = useTheme()
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(ETHER)
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0)),
    )

  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )

  const prerequisiteMessage = (
    <StyledLightCard onClick={() => setCurrency0(undefined)}>
      <PreTitle textAlign="center">
        {!account ? t('Connect to a wallet to find pools') : t('Select a token to find your liquidity.')}
      </PreTitle>
    </StyledLightCard>
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      showCommonBases
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

  return (
    <Modal
      title={t('Import Pool')}
      icon={<IconPoolImport fill={theme.isDark ? theme.colors.contrast : theme.colors.bluePalette.accent} />}
      width="346px"
      onDismiss={onDismiss}
    >
      <Flex alignItems="center" mb="12px">
        <PreTitle>{t('Import an existing pool')}</PreTitle>
        <Flex alignItems="center" ml="auto">
          <GlobalSettings />
          <Transactions />
        </Flex>
      </Flex>
      <Box mb="16px">
        <StyledButton
          onClick={() => {
            onPresentCurrencyModal()
            setActiveField(Fields.TOKEN0)
          }}
        >
          {currency0 ? (
            <>
              <CurrencyLogo currency={currency0} size="32px" />
              <BodyFont ml="8px" bold>
                {currency0.symbol}
              </BodyFont>
            </>
          ) : (
            <BodyFont ml="8px">{t('Select a Token')}</BodyFont>
          )}
          <Box ml="auto">
            <DropDownBottomIcon width="24px" ml="auto" />
          </Box>
        </StyledButton>

        <Flex justifyContent="center" my="16px">
          <AddIconBox>
            <AddIcon width="12px" />
          </AddIconBox>
        </Flex>

        <StyledButton
          onClick={() => {
            onPresentCurrencyModal()
            setActiveField(Fields.TOKEN1)
          }}
        >
          {currency1 ? (
            <>
              <CurrencyLogo currency={currency1} size="32px" />
              <BodyFont ml="8px" bold>
                {currency1.symbol}
              </BodyFont>
            </>
          ) : (
            <BodyFont ml="8px">{t('Select a Token')}</BodyFont>
          )}
          <Box ml="auto">
            <DropDownBottomIcon width="24px" />
          </Box>
        </StyledButton>
      </Box>
      <AutoColumn gap="md">
        {hasPosition && (
          <ColumnCenter
            style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
          >
            <Text textAlign="center">{t('Pool Found!')}</Text>
            <StyledLink href="/pool">{t('Manage this pool.')}</StyledLink>
          </ColumnCenter>
        )}

        {currency0 && currency1 ? (
          pairState === PairState.EXISTS ? (
            hasPosition && pair ? (
              <MinimalPositionCard pair={pair} />
            ) : (
              <StyledLightCard>
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center">{t('You don’t have liquidity in this pool yet.')}</Text>
                  <StyledLink href={`/liquidity/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                    {t('Add Liquidity')}
                  </StyledLink>
                </AutoColumn>
              </StyledLightCard>
            )
          ) : validPairNoLiquidity ? (
            <StyledLightCard>
              <AutoColumn gap="sm" justify="center">
                <Text textAlign="center">{t('No pool found.')}</Text>
                <StyledLink href={`/liquidity/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                  {t('Create pool.')}
                </StyledLink>
              </AutoColumn>
            </StyledLightCard>
          ) : pairState === PairState.INVALID ? (
            <StyledLightCard>
              <AutoColumn gap="sm" justify="center">
                <Text textAlign="center" fontWeight={500}>
                  {t('Invalid pair.')}
                </Text>
              </AutoColumn>
            </StyledLightCard>
          ) : pairState === PairState.LOADING ? (
            <StyledLightCard>
              <AutoColumn gap="sm" justify="center">
                <Text textAlign="center">
                  {t('Loading')}
                  <Dots />
                </Text>
              </AutoColumn>
            </StyledLightCard>
          ) : null
        ) : (
          prerequisiteMessage
        )}
      </AutoColumn>
    </Modal>
  )
}

export default ImportPoolModal
