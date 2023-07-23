import { Box } from '@crosswiselabs/uikit'
import styled from 'styled-components'

export const DetailBox = styled(Box)`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
`
