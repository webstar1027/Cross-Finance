import styled from 'styled-components'
import { Card } from '@crosswiselabs/uikit'

export const StyledExpiredRoundCard = styled(Card)`
  opacity: 0.7;
  transition: opacity 300ms;

  &:hover {
    opacity: 1;
  }
`
