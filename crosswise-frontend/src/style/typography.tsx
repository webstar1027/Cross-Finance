import React from 'react'
import styled from 'styled-components'
import { Text } from '@crosswiselabs/uikit'

const StyledH1 = styled(Text)`
  font-family: genos;
  font-size: 45px;
  line-height: 54px;
  font-weight: 600;
  letter-spacing: -0.01em;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 57px;
    line-height: 68px;
    font-weight: 800;
  }
`

const StyledH2 = styled(Text)`
  font-family: genos;
  font-size: 36px;
  line-height: 43px;
  font-weight: 600;
  letter-spacing: -0.01em;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 45px;
    line-height: 54px;
  }
`

const StyledH3 = styled(Text)`
  font-family: genos;
  font-size: 29px;
  line-height: 35px;
  font-weight: 600;
  letter-spacing: -0.01em;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 36px;
    line-height: 43px;
  }
`

const StyledH4 = styled(Text)`
  font-family: genos;
  font-size: 25px;
  line-height: 30px;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 29px;
    line-height: 35px;
    letter-spacing: -0.01em;
  }
`

const StyledH5 = styled(Text)`
  font-family: genos;
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 25px;
    line-height: 30px;
  }
`

const StyledH6 = styled(Text)`
  font-family: genos;
  font-size: 15px;
  line-height: 18px;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
    line-height: 22px;
  }
`

export const H1 = ({ ...props }): JSX.Element => <StyledH1 as="h1" {...props} />

export const H2 = ({ ...props }): JSX.Element => <StyledH2 as="h2" {...props} />

export const H3 = ({ ...props }): JSX.Element => <StyledH3 as="h3" {...props} />

export const H4 = ({ ...props }): JSX.Element => <StyledH4 as="h4" {...props} />

export const H5 = ({ ...props }): JSX.Element => <StyledH5 as="h5" {...props} />

export const H6 = ({ ...props }): JSX.Element => <StyledH6 as="h6" {...props} />

export const BodyFont = styled(Text)`
  font-size: 13px;
  line-height: 1.5;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

export const PreTitle = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.homeTitle};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 13px;
    line-height: 16px;
  }
`

export const SmallTitle = styled(Text)`
  font-size: 10px;
  line-height: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.homeTitle};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 12px;
    line-height: 15px;
  }
`

export const ButtonText = styled(Text)`
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.04em;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 12px;
    line-height: 15px;
  }
`

export const SmallCopy = styled(Text)`
  font-weight: 700;
  font-size: 8px;
  line-height: 10px;
  color: ${({ theme }) => theme.colors.primaryGray};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 10px;
    line-height: 12px;
  }
`

export const FieldLabel = styled(SmallTitle)`
  text-transform: initial;
`
