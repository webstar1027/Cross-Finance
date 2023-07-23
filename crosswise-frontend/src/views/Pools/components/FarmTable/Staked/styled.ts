import styled from 'styled-components'

export const ReferenceElement = styled.div`
  display: inline-block;
`

export const LiquidityWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'row' : 'column')};
  align-items: ${({ isMobile }) => (isMobile ? 'center' : 'flex-end')};
  min-width: 110px;
  font-weight: 600;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
`
