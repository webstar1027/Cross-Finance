import styled, { css } from 'styled-components'
import { Text } from '@crosswiselabs/uikit'

export const Texter = styled(Text)<{ color?: string; fSize?: string; textAlign?: string }>`
  line-height: normal;
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
  ${(props) =>
    props.fSize &&
    css`
      font-size: ${props.fSize};
    `}

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`

export const TextBox = styled(Texter)<{ color?: string; fSize?: string }>`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const ThemeText = styled(Texter)<{ isDarkTheme: boolean; colors: Array<string>; textAlign?: string }>`
  color: ${(props) => (props.isDarkTheme ? props.colors[0] : props.colors[1])};
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
`

export const GradientTexter = styled(Texter)<{ colors: Array<string> }>`
  background: linear-gradient(270deg, ${(props) => props.colors[0]} 5.49%, ${(props) => props.colors[1]} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`
