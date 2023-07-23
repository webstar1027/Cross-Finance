import styled from 'styled-components'
import { Button, Text, Flex } from '@crosswiselabs/uikit'
import { BodyFont } from 'style/typography'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  @media screen and (max-width: 852px) {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;
    padding: 15px 25px;
  }
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
export const StyledButton = styled(Button)`
  margin: 10px;
  height: 35px;
  font-size: 12px;
`
export const StyledValue = styled(BodyFont)`
  margin-top: 10px;
`
export const SubColumnTitle = styled(SubColumn)`
  @media screen and (max-width: 852px) {
    grid-column: 1 / span 3;
    height: 50%;
  }
`
export const StyledFlex = styled(Flex)`
  @media screen and (max-width: 852px) {
    grid-column: 1 / span 3;
    a {
      width: 100%;
    }
    button {
      width: 100%;
      margin: 20px 0;
      height: 47px;
    }
  }
`
export const MobileRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
