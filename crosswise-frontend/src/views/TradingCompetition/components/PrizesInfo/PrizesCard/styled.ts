import styled from 'styled-components'
import { Card } from '@crosswiselabs/uikit'

export const StyledCard = styled(Card)`
  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 40px;
    flex: 1;
  }
`
