import styled from 'styled-components'
import { Text, Button, Flex } from '@crosswiselabs/uikit'
import { IconLock } from 'components/SvgIcons'
import { H5, PreTitle } from 'style/typography'

export const Container = styled.div`
  width: 100%;
`
export const SubColumn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`
export const TokenPairWrapper = styled.div`
  padding: 2px;
  width: 34px;
  margin-left: 20px;
`
export const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`
export const CardContent = styled.div<{ collapse: boolean }>`
  width: 100%;
  height: ${({ collapse }) => (collapse ? '180px' : '0')};
  overflow: hidden;
  background: rgba(245, 255, 252, 0.1);

  box-shadow: ${({ theme }) => (theme.isDark ? '2px 2px 6px 0px #000000D9 inset' : theme.shadows.lightInset)};
  
  border-radius: 6px;
  padding: ${({ collapse }) => (collapse ? '30px' : '0')};
  margin: 15px 5px 0px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-out;
  @media screen and (max-width: 576px) {
    margin: 15px 0px 0px 0px;
    height: ${({ collapse }) => (collapse ? '100%' : '0')};
    padding: ${({ collapse }) => (collapse ? '20px 16px 0px 16px' : '0')};
`

export const StyledText = styled(Text)`
  margin-bottom: 10px;
`
export const StyledButton = styled(Button)`
  height: 35px;
  font-size: 12px;
`
export const IconButton = styled.div`
  cursor: pointer;
  display: flex;
`
export const StyledFlex = styled(Flex)`
  @media screen and (max-width: 576px) {
    a {
      width: 100%;
    }
    button {
      width: 100%;
      height: 47px;
    }
    margin-bottom: 10px;
  }
`
export const LpCard = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 576px) {
    flex-direction: column;
  }
`

export const SubTitle = styled(H5)`
  margin: 16px 0;
`

export const TableWrapper = styled.div`
  background: ${({ theme }) => (theme.isDark ? 'rgba(245, 255, 252, 0.1)' : '#E8F1FA54')};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? 'inset -2px -2px 6px rgba(255, 255, 255, 0.1), inset 2px 2px 6px rgba(0, 0, 0, 0.85)'
      : 'inset -2px -2px 4px rgba(243, 237, 237, 0.45), inset 2px 2px 4px rgba(0, 0, 0, 0.25)'};
`

export const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 36px;
`

export const LockIcon = styled(IconLock)`
  width: 16px;
  height: 16px;
  margin-left: 10px;
`

export const HeaderRow = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 12px;
  justify-items: flex-start;
  align-items: center;
  padding: 0px 12px;
  cursor: pointer;
`

export const HeaderCell = styled(PreTitle)``

export const TableRow = styled(HeaderRow)`
  border-top: 1px solid rgba(196, 196, 196, 0.1);
  &:hover {
    background: rgba(217, 217, 217, 0.15);
  }
`

export const TableCell = styled(Text)`
  font-size: 12px;
`

export const NoDataRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  padding: 0px 12px;
`
