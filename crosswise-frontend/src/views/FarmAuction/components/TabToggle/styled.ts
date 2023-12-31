import React from 'react'
import { Flex } from '@crosswiselabs/uikit'
import styled from 'styled-components'

export const Wrapper = styled(Flex)`
  overflow-x: scroll;
  padding: 0;
  border-radius: 24px 24px 0 0;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* Firefox */
`

export const Inner = styled(Flex)`
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.input};
  width: 100%;
`

interface TabProps {
  isActive?: boolean
  onClick?: () => void
}

export const TabToggle = styled.button<TabProps>`
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  border: 0;
  outline: 0;
  flex-grow: 1;
  padding: 16px;
  margin: 0;
  border-radius: 24px 24px 0 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.text : theme.colors.textSubtle)};
  background-color: ${({ theme, isActive }) => (isActive ? theme.card.background : theme.colors.input)};
`
