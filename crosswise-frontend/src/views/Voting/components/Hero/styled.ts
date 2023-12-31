import { Box } from '@crosswiselabs/uikit'
import styled from 'styled-components'

export const StyledHero = styled(Box)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-bottom: 32px;
  padding-top: 32px;
`
