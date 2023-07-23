import React, { useState, useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Text, Skeleton, useMatchBreakpoints } from '@crosswiselabs/uikit'
import { Pool } from 'state/types'
import { useThemeManager } from 'state/user/hooks'
import { getBscScanLink } from 'utils'
import useTheme from 'hooks/useTheme'
// import { useTranslation } from 'contexts/Localization'
// import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { useLpTokenPrice } from 'state/pools/hooks'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { ViewMode } from '../types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import {
  StyledCard,
  FarmCardInnerContainer,
  // DetailToggleButton,
  LabelNameText,
  BalanceContainerWrapper,
  BalanceItem,
  EarningsWrapper,
  HorizontalDivider,
} from './styled'
import BalanceContainer from './BalanceContainer'

export interface FarmWithStakedValue extends Pool {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
  depositFee?: string
}

interface FarmCardProps {
  viewMode: string
  farm: FarmWithStakedValue
  displayApr: string
  removed: boolean
  crssPrice?: BigNumber
  account?: string
  index?: number
}

const FarmCard: React.FC<FarmCardProps> = ({ viewMode, farm, displayApr, removed, crssPrice, account, index }) => {
  const [isCollapsed, setIsCollapsed] = useState(viewMode === ViewMode.TABLE)
  // const { t } = useTranslation()
  const { theme } = useTheme()
  const { isXs, isSm } = useMatchBreakpoints()

  useEffect(() => {
    setIsCollapsed(viewMode === ViewMode.TABLE)
  }, [viewMode])

  const handleClickCardHead = () => {
    if (viewMode === ViewMode.CARD) return
    setIsCollapsed(!isCollapsed)
  }

  const [isDark] = useThemeManager()

  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 6 })}`
      : '$0'

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('CROSSWISE', '')
  // const earnLabel = farm.dual ? farm.dual.earnLabel : t('CRSS')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const lpAddress = getAddress(farm.lpAddresses)
  const isPromotedFarm = farm.token.symbol === 'CRSS'

  const isMobile = isXs || isSm

  const { stakedBalance: stakedBalanceAsString = 0 } = farm.userData || {}
  const stakedBalance = useMemo(() => {
    return new BigNumber(stakedBalanceAsString)
  }, [stakedBalanceAsString])
  const lpPrice = useLpTokenPrice(farm.lpSymbol)

  return (
    <StyledCard index={index} isMobile={isMobile} isActive={isPromotedFarm} background={theme.colors.backgroundAlt}>
      <DetailsSection
        removed={removed}
        bscScanAddress={getBscScanLink(lpAddress, 'address')}
        infoAddress={`https://app.crosswise.finance/pool/${lpAddress}`}
        totalValueFormatted={totalValueFormatted}
        lpLabel={lpLabel}
        addLiquidityUrl={addLiquidityUrl}
        // expanded={showExpandableSection}
      />

      <FarmCardInnerContainer>
        <CardHeading
          onClick={handleClickCardHead}
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          // isCommunityFarm={farm.isCommunity}
          token={farm.token}
          quoteToken={farm.quoteToken}
        />
        <HorizontalDivider />
        <BalanceContainerWrapper>
          <BalanceItem alignItems="flex-start">
            <LabelNameText isMobile={isMobile} color="primaryGray">
              Total Liquidity
            </LabelNameText>
            <Text fontSize={isMobile ? '12px' : '16px'}>
              {/* $285,454,728 */}
              {totalValueFormatted}
            </Text>
          </BalanceItem>
          {!removed && (
            <BalanceItem alignItems="flex-start">
              <LabelNameText isMobile={isMobile} color="primaryGray" style={{ marginBottom: 6 }}>
                Apr
                <ApyButton
                  lpLabel={lpLabel}
                  addTokenUrl={addLiquidityUrl}
                  // crssPrice={crssPrice}
                  apr={farm.apr}
                  displayApr={displayApr}
                />
              </LabelNameText>
              <Text bold style={{ display: 'flex', alignItems: 'baseline' }}>
                {farm.apr ? (
                  <Text color={displayApr ? 'textSecondary' : ''} style={{ marginLeft: 5 }}>
                    {displayApr}%
                  </Text>
                ) : (
                  <Skeleton height={24} width={80} />
                )}
              </Text>
            </BalanceItem>
          )}
          <BalanceItem alignItems="flex-end">
            <LabelNameText isMobile={isMobile} color="primaryGray">
              Staked
            </LabelNameText>
            <Text fontSize={isMobile ? '12px' : '16px'} textAlign="right">
              <Text>{`${getFullDisplayBalance(stakedBalance, 18, 2)} CRSS`}</Text>
              <Text fontSize={isMobile ? '10px' : '12px'} color="primaryGray">
                {`~ ${getFullDisplayBalance(stakedBalance.times(lpPrice), 18, 2)} USD`}
                {/* ~ 6,200 USD */}
              </Text>
            </Text>
          </BalanceItem>
        </BalanceContainerWrapper>
        {/* <Divider height={20} /> */}
        {(!isMobile || account) && (
          <>
            {!isCollapsed && (
              <EarningsWrapper>
                <BalanceContainer farm={farm} account={account} />
              </EarningsWrapper>
            )}
            <CardActionsContainer
              isCollapsed={isCollapsed}
              farm={farm}
              account={account}
              addTokenUrl={addLiquidityUrl}
            />
          </>
        )}
      </FarmCardInnerContainer>

      {/* <DetailToggleButton onClick={clickDetailToggleButton} expanded={showExpandableSection}>
        <ArrowBackIcon />
      </DetailToggleButton> */}
    </StyledCard>
  )
}

export default FarmCard
