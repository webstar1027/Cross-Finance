import React from 'react'
// import { useWeb3React } from '@web3-react/core'
// import { Flex, BinanceIcon, CardIcon } from '@crosswiselabs/uikit'
import { Flex, CardIcon } from '@crosswiselabs/uikit'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import {
  getCrssAddress,
  getSCrssAddress,
  // getXCrssAddress
} from 'utils/addressHelpers'
// import { NetworkBlock, Block, StyledContent } from './styled'
import { Block, StyledContent } from './styled'

const MainAssets = () => {
  // const { account } = useWeb3React()
  const { balance: crssBalance } = useTokenBalance(getCrssAddress())
  const { balance: xcrssBalance } = useTokenBalance(getSCrssAddress())

  return (
    <Flex>
      <Block>
        <img src="/images/tokens/scrss.svg" alt="sCRSS token" style={{ width: 20 }} />
        <StyledContent>{getFullDisplayBalance(xcrssBalance, 18, 2)}</StyledContent>
      </Block>
      <Block>
        <img src="/images/tokens/crss.svg" alt="sCRSS token" style={{ width: 20 }} />
        <StyledContent>{getFullDisplayBalance(crssBalance, 18, 2)}</StyledContent>
      </Block>
      {/* <Block>
        <StyledContent>0.00 MATIC</StyledContent>
      </Block> */}
    </Flex>
  )
}

export default MainAssets
