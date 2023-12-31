import React from 'react'
import { ButtonMenu, ButtonMenuItem, LinkExternal, Flex, Svg, Image, Button } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import { Wrapper, BubbleWrapper } from './styled'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Flex flexDirection={['column', 'column', 'row']} alignItems="center">
        <ButtonMenu variant="subtle" scale="sm" activeIndex={0}>
          <ButtonMenuItem>V2</ButtonMenuItem>
          <ButtonMenuItem as="a" href="https://v1exchange.pancakeswap.finance/#/">
            V1 (old)
          </ButtonMenuItem>
        </ButtonMenu>
        <LinkExternal
          href="https://www.binance.org/en/bridge?utm_source=PancakeSwap"
          ml={[0, 0, '40px']}
          mt={['20px', '20px', 0]}
          mb={['8px', '8px', 0]}
        >
          {t('Convert ERC-20 to BEP-20')}
        </LinkExternal>
      </Flex>
      <Flex
        flexGrow={1}
        alignItems="center"
        width={['100%', '100%', '100%', 'auto']}
        justifyContent={['center', 'center', 'center', 'flex-end']}
      >
        <BubbleWrapper>
          <Button
            id="clickExchangeHelp"
            as="a"
            external
            href="https://docs.pancakeswap.finance/products/pancakeswap-exchange"
            variant="subtle"
          >
            {t('Need help ?')}
          </Button>
          <Svg viewBox="0 0 16 16">
            <path d="M0 16V0C0 0 3 1 6 1C9 1 16 -2 16 3.5C16 10.5 7.5 16 0 16Z" />
          </Svg>
        </BubbleWrapper>
        <Image src="/images/help.svg" alt="Get some help" width={160} height={108} />
      </Flex>
    </Wrapper>
  )
}

export default Footer
