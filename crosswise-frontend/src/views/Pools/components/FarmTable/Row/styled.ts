import styled from 'styled-components'
import { StyledContainer } from 'views/Farms/styled'

export const StyledTr = styled(StyledContainer)<{ index: number; isMobile?: boolean }>`
  cursor: pointer;
  margin-bottom: 15px;
  border-radius: 20px;
`
