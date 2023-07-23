import styled, { css } from 'styled-components'
import { StyledIconButton } from '../../FarmCard/styled'

export const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: end;
  ${StyledIconButton} {
    & > div {
      margin-top: -60px;
      margin-left: 0;
    }
  }
`
