import React from 'react'
import { useMatchBreakpoints } from '@crosswiselabs/uikit'
import { StyledPage } from './styled'
import { PageProps } from './interfaces'
import PageMeta from './PageMeta'

const Page: React.FC<PageProps> = ({ children, symbol, ...props }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  return (
    <>
      <PageMeta symbol={symbol} />
      <StyledPage isMobile={isMobile} {...props}>
        {children}
      </StyledPage>
    </>
  )
}

export default Page
