import React from 'react'
import { Box, BoxProps } from '@crosswiselabs/uikit'
import styled from 'styled-components'

export const VotingBox = styled.div`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 12px;
  display: flex;
  height: 64px;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 0 16px;
`
