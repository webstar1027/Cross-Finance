import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Skeleton, useMatchBreakpoints } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePriceCrssBusd } from 'state/farms/hooks'
import useTheme from 'hooks/useTheme'
import useTVL from 'hooks/useTvl'
import { PreTitle } from 'style/typography'
import MarketCap from '../StatisticComponents/MarketCap'
import Circulation from '../StatisticComponents/Circulation'
import { Container, SubColumn, StyledButton, StyledValue, StyledFlex } from './styled'

const AboutCrss = () => {
  const { t } = useTranslation()
  const tvlData = useTVL()
  const crssTokenPrice = usePriceCrssBusd().toNumber()
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  const theme = useTheme()
  return (
    <Container>
      <SubColumn>
        <PreTitle>{t('Volume 24h')}</PreTitle>
        <StyledValue>$ 1,000,999</StyledValue>
      </SubColumn>
      <SubColumn>
        <PreTitle>{t('Price')}</PreTitle>
        <StyledValue>
          {Number(crssTokenPrice) > 0 ? <>$ {crssTokenPrice.toFixed(2)}</> : <Skeleton width={60} />}
        </StyledValue>
      </SubColumn>
      <SubColumn>
        <PreTitle>{t('Market Cap')}</PreTitle>
        <StyledValue>
          <MarketCap />
        </StyledValue>
      </SubColumn>
      <SubColumn span={2}>
        <PreTitle>{t('Circulating Supply')}</PreTitle>
        <StyledValue>
          <Circulation />
        </StyledValue>
      </SubColumn>
      <SubColumn>
        <PreTitle>{t('TVL')}</PreTitle>
        <StyledValue>
          {Number(tvlData) > 0 ? (
            <>${tvlData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</>
          ) : (
            <Skeleton width={60} />
          )}
        </StyledValue>
      </SubColumn>
      <StyledFlex>
        <RouterLink to="/exchange">
          <StyledButton variant={isMobile && !theme.isDark ? 'secondaryGradient' : 'primaryGradient'}>
            {t('Buy CRSS')}
          </StyledButton>
        </RouterLink>
      </StyledFlex>
    </Container>
  )
}

export default AboutCrss
