import styled from 'styled-components'

export const Container = styled.div<{ isMobile?: boolean }>`
  width: 100%;
  border-radius: 16px;
  margin: ${({ isMobile }) => `${isMobile ? 10 : 16}px 0px`};
  border: none;
  background: transparent;
`

export const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

/* export const StyledTable = styled.table` */
export const StyledTable = styled.div`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

/* export const TableBody = styled.tbody` */
export const TableBody = styled.div`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

export const TableContainer = styled.div`
  position: relative;
`

export const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`
