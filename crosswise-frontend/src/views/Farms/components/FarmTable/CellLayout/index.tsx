import React from 'react'
import { Flex, useMatchBreakpoints } from '@crosswiselabs/uikit'
import { PreTitle } from 'style/typography'
import { ContentContainer } from './styled'

interface CellLayoutProps {
  label?: string
  alignItems?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children, alignItems = 'center' }) => {
  const { isXs, isSm } = useMatchBreakpoints()

  const isMobile = isXs || isSm
  return (
    <Flex
      flexDirection={isMobile ? 'row' : 'column'}
      justifyContent={isMobile ? 'space-between' : 'center'}
      alignItems={alignItems}
    >
      {label && (
        <PreTitle mb={isMobile ? '0px' : '10px'} mr={isMobile ? '10px' : '0px'}>
          {label}
        </PreTitle>
      )}
      <ContentContainer>{children}</ContentContainer>
    </Flex>
  )
}

export default CellLayout
