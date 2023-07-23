import styled, { css } from 'styled-components'
import { Flex, Text } from '@crosswiselabs/uikit'

export const ExpandButtonText = styled(Flex)<{ bgColor: string; radius: string }>`
  position: absolute;
  left: -1px;
  bottom: -1px;
  width: calc(100% + 2px);
  height: 20px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  color: #ffffff;
  display: flex;
  border: 1px solid transparent;
  border-top-width: 0px;

  ${({ radius }) =>
    css`
      border-radius: 0 0 ${radius} ${radius};
    `}

  &:after {
    content: ' ';
    position: absolute;
    left: 0px;
    bottom: 20px;
    width: 100%;
    height: 20px;
    background: ${({ bgColor }) => bgColor};

    ${({ radius }) =>
      css`
        border-radius: 0 0 ${radius} ${radius};
      `}
  }

  &:before {
    content: ' ';
    position: absolute;
    left: -1px;
    bottom: 18px;
    width: calc(100% + 2px);
    height: 20px;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }

  &:hover {
    border: 1px solid #04f8ad;
    border-top-width: 0px;

    &:before {
      border-left: 1px solid #04f8ad;
      border-right: 1px solid #04f8ad;
    }

    &:after {
      left: -1px;
      width: calc(100% + 2px);
      border: 1px solid #04f8ad;
      border-top-width: 0px;
    }
  }
`

export const ExpandButtonOuterWrapper = styled.div<{ radius: string }>`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 40px;
  background: #6f61f3;
  cursor: pointer;
  ${({ radius }) =>
    css`
      border-radius: 0 0 calc(${radius} - 1px) calc(${radius} - 1px);
    `}
`

export const ExpandButtonWrapper = styled.div<{ radius: string }>`
  position: relative;
  width: 100%;
  height: 100%;
`
