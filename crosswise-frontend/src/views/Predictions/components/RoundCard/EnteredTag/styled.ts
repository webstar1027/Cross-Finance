import styled from 'styled-components'
import { Tag } from '@crosswiselabs/uikit'

export const StyledEnteredTag = styled(Tag)`
  font-weight: bold;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.background};
`
