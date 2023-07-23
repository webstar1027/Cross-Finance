import styled from 'styled-components'
import { AutoColumn } from 'components/Layout/Column'

export const SwapModalFooterContainer = styled(AutoColumn)`
  margin-top: 24px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.background};
`
export const ToolTipText = styled.div`
  font-size: 15px;
  line-height: 130%;
  color: ${({ theme }) => theme.colors.primaryGray};
`
