import React, { useMemo } from 'react'
import { Pair } from '@crosswise/sdk'
import { Text, Box, Flex, useMatchBreakpoints, useModal } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FullPositionCard from 'components/PositionCard'
import Dots from 'components/Loader/Dots'
// import QuestionHelper from 'components/QuestionHelper'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { usePairs } from 'hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { BodyFont } from 'style/typography'
import { Body, StyledBody, Wrapper, NoAccountWrapper } from './styled'
import ImportPoolModal from './components/ImportPoolModal'

export default function Pool() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const { isXs, isSm, isMd } = useMatchBreakpoints()
  const isMobile = isXs || isSm || isMd
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  // console.log('trackedTokenPairs: ', trackedTokenPairs)
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
    if (!account) {
      return (
        <NoAccountWrapper>
          <Text fontSize="13px" fontWeight="600">
            {t('Connect to a wallet to view your liquidity.')}
          </Text>
          <ConnectWalletButton
            variant="primaryGradient"
            padding="0px 24px"
            // scale="sm"
            btnString={t('Connect Wallet')}
            width={isMobile && '100%'}
          />
        </NoAccountWrapper>
      )
    }
    if (v2IsLoading) {
      return (
        <Text textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return <Text textAlign="center">{t('No liquidity found.')}</Text>
  }

  const [onPresentImport] = useModal(<ImportPoolModal />, true, false, 'importPoolModal')

  return (
    <Wrapper>
      <Flex mb="10px" alignItems="center">
        <BodyFont fontWeight="bold">{t('Your Liquidity')}</BodyFont>
        {/* <QuestionHelper text={t('Liquidity Help')} ml="4px" /> */}
      </Flex>

      <Body>
        <StyledBody>{renderBody()}</StyledBody>
        {account && !v2IsLoading && (
          <Box mt="auto" paddingTop="30px">
            <Flex>
              <BodyFont>{t("Don't see a pool you joined?")}</BodyFont>
              <BodyFont color="primary" ml="8px" onClick={onPresentImport} style={{ cursor: 'pointer' }}>
                {t('Import it')}
              </BodyFont>
            </Flex>
            <BodyFont>
              {t('Or, if you staked your CROSSWISE-LP tokens in a farm, unstake them to see them here.')}
            </BodyFont>
          </Box>
        )}
      </Body>
    </Wrapper>
  )
}
