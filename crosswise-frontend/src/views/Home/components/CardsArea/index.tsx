import React from 'react'
import { useSelector } from 'react-redux'
// import { Link as RouterLink } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  Text,
  TokenPairImage,
  DropDownBottomIcon,
  DropDownUpIcon,
  Flex,
  LiquidityIcon,
  RewardsIcon,
  SectorIcon,
  WalletIcon,
  ClaimIcon,
  PoolIcon,
  useMatchBreakpoints,
  Skeleton,
} from '@crosswiselabs/uikit'
import { farmsConfig, poolsConfig } from 'config/constants'
// import useTokenBalance from 'hooks/useTokenBalance'
// import useTheme from 'hooks/useTheme'
// import { getFullDisplayBalance } from 'utils/formatBalance'
// import { getCrssAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import tokens from 'config/constants/tokens'
import { SmallTitle } from 'style/typography'
import Collapse from 'components/Collapse'
import { Container, SubColumn, IconButton } from './styled'
import LiquidityTable from './LiquidityTable'
import StakeTable from './StakeTable'

const CardsArea = ({ allStakings, allLps, allAccRewards }) => {
  const farmsDataLoaded = useSelector((state: any) => state.farms.userDataLoaded)
  const poolsDataLoaded = useSelector((state: any) => state.pools.userDataLoaded)
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  const dataIsLoaded = farmsDataLoaded && poolsDataLoaded
  const [collapse, setCollapse] = React.useState(false)
  const { chainId } = useActiveWeb3React()
  const allConfig = farmsConfig.concat(poolsConfig)
  // const { balance: crssBalance } = useTokenBalance(getCrssAddress())
  const sumRewards = allAccRewards.reduce((sum, reward) => {
    return sum + reward
  }, 0)
  const poolRewards = allAccRewards[0]
  const farmRewards = sumRewards - poolRewards
  const { t } = useTranslation()

  const collapseClicked = () => {
    setCollapse(!collapse)
  }

  return (
    <Container>
      <SubColumn>
        <Flex alignItems="center">
          <SmallTitle>{t('Liquidity & Stakes')} &nbsp;</SmallTitle>
          <PoolIcon fill="primaryText" width="15px" />
        </Flex>
        <IconButton onClick={collapseClicked}>
          {collapse ? <DropDownBottomIcon width="24px" mr={20} /> : <DropDownUpIcon width="24px" mr={20} />}
        </IconButton>
      </SubColumn>
      <Collapse isOpen={!collapse}>
        <LiquidityTable />
        <StakeTable />
      </Collapse>
    </Container>
  )
}

export default CardsArea
