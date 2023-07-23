import styled from 'styled-components'
import { Text } from '@crosswiselabs/uikit'

export const StyledText = styled(Text)<{
  opacity?: string
}>`
  opacity: ${({ opacity }) => opacity};
`
