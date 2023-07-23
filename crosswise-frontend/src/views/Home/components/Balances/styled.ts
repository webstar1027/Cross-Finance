import styled from 'styled-components'
import { Text } from '@crosswiselabs/uikit'
import { BodyFont } from 'style/typography'

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 852px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
  }
  padding-bottom: 20px;
`
export const SubColumn = styled.div<{ span?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 852px) {
    ${({ span }) =>
      span &&
      `
      grid-column: 1 / span ${span};
    `}
  }
`
export const SubColumnTitle = styled(SubColumn)`
  @media screen and (max-width: 852px) {
    grid-column: 1 / span 2;
    height: 50%;
  }
`

export const StyledValue = styled(BodyFont)`
  margin-top: 10px;
`
