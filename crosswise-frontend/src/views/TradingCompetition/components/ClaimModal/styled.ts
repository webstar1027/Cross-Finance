import styled from 'styled-components'
import { Flex } from '@crosswiselabs/uikit'

export const ImageWrapper = styled(Flex)`
  justify-content: center;
  width: 100%;
  height: fit-content;
  img {
    border-radius: ${({ theme }) => theme.radii.default};
  }
`
