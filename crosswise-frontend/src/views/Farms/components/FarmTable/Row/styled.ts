import styled, { css, keyframes } from 'styled-components'
import { DropDownBottomIcon, LinkExternal, Button, Flex, Toggle } from '@crosswiselabs/uikit'
import { StyledContainer } from 'views/Farms/styled'
import { IconLock, ChevronDownIcon as ChevronDown } from 'components/SvgIcons'

export const CellInner = styled.div<{ alignItems?: string; lastColumn?: boolean; isMobile?: boolean }>`
  /* padding: 24px 0px; */
  ${({ isMobile }) =>
    isMobile &&
    css`
      display: flex;
    `}
  align-items: ${({ alignItems }) => alignItems || 'center'};
  width: ${({ isMobile, lastColumn }) => (!isMobile && lastColumn ? '100%' : 'max-content')};
  padding-right: ${({ isMobile, lastColumn }) => (!isMobile && lastColumn ? '40px' : '0px')};

  ${({ theme }) => theme.mediaQueries.xl} {
    /* padding-right: 32px; */
  }
`

export const Wrapper = styled.div`
  position: relative;
`

export const StyledTr = styled(StyledContainer)<{ index: number; isMobile?: boolean; isLock?: boolean }>`
  cursor: pointer;
  transition: box-shadow 0.5s;
  transition: transform 1s;
  margin-bottom: 15px;

  ${({ isLock }) =>
    isLock &&
    css`
      background-image: ${({ theme }) =>
        `${
          theme.isDark ? theme.colors.backgroundAlt : 'linear-gradient(#FFF, #FFF)'
        }, linear-gradient(#EEBF00, #EEBF00)`};
    `}
  border-radius: 20px;
`

export const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

export const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

export const FarmMobileCell = styled.td`
  padding-top: 24px;
`

export const DepositFeeMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

export const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px;
`

export const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 56px;
  }
`

export const RowBody = styled.div<{ columnsTemplate?: string; alignItems?: string; isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMobile, columnsTemplate }) =>
    isMobile ? '1fr' : columnsTemplate ?? '1fr 1fr 1fr 1fr'};
  justify-content: space-between;
  justify-items: center;
  align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
  padding: ${({ isMobile }) => (isMobile ? '10px 15px' : '19px 25px')};
`

export const EarningRow = styled.div<{ isMobile: boolean; justifyContent?: string }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ isMobile }) => (isMobile ? '1fr' : `1fr 1fr 1fr 1fr`)};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'space-between'};
  justify-items: center;
  align-items: center;
  margin: 10px 0;
`

export const FirstColumn = styled(Flex)<{ isMobile?: boolean }>`
  justify-self: ${({ isMobile }) => (isMobile ? 'center' : 'start')};
`

export const LastColumn = styled(Flex)<{ isMobile?: boolean }>`
  justify-self: ${({ isMobile }) => (isMobile ? 'center' : 'end')};
`

export const ExpandMainInfoButton = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
`

export const StyledLinkExternal = styled(LinkExternal)<{ isMobile?: boolean }>`
  ${({ isMobile }) =>
    !isMobile &&
    css`
      width: 100%;
    `}
  display: flex;
  svg {
    fill: #218bff;
    margin-left: 10px;
  }
`

export const ActionButton = styled(Button)<{ width: string }>`
  /* height: 40px; */
  width: 120px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: ${({ width }) => width ?? '152px'};
  }
  border-radius: 6px;
  /* margin-left: 10px; */
  background: linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%);
`

export const NextUnlockPanel = styled(Flex)<{ isMobile?: boolean }>`
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  border-radius: 6px;
  min-width: 152px;
  height: 48px;
  padding: 0px 12px;
  /* padding: 5px; */
`

export const StyledSettingIcon = styled.div`
  background: url('/images/icons/GearFrameIcon.png');
  background-size: cover;
  width: 20px;
  height: 20px;
`

export const ChevronDownIcon = styled(ChevronDown)`
  margin-left: 10px;
`

export const ChevronUpIcon = styled(ChevronDownIcon)`
  transform: rotate(180deg);
`

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  justify-content: flex-end;
  margin-right: 22px;
  /* width: 100%; */
  /* ${({ theme }) => theme.mediaQueries.xl} {
    width: 200px;
  } */
`

export const ToggleWrapper = styled.div<{ isMobile?: boolean }>`
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${({ isMobile }) => (isMobile ? '5px' : '12px')};
  /* margin: 5px 0; */
  margin-left: ${({ isMobile }) => (isMobile ? '15px' : '36px')};
  &:last-child {
    margin-bottom: 0;
  }
`

export const StyledToggle = styled(Toggle)`
  width: 45px;
  & > span {
    top: 6px;
  }
`

export const CrossedText = styled.span<{ checked: boolean }>`
  text-decoration: line-through;
  font-size: 12px;
  color: ${({ checked }) => (checked ? '#04F8AD' : '#be3f50')};
`

export const DropDownIcon = styled(DropDownBottomIcon)`
  position: absolute;
  right: 15px;
  top: 21px;
  cursor: pointer;
`

export const VestingListTable = styled.div<{ isMobile?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  padding: 0 ${({ isMobile }) => (isMobile ? 10 : 25)}px;
  margin-bottom: 40px;
  width: 100%;
`

export const VestingListTableRow = styled.div<{ border?: string }>`
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr; */
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 16px 0;
`

export const VestingListTableCell = styled.div<{ textAlign?: string; color?: string }>`
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
  ${({ color }) => color && `color: ${color};`}
`

export const VestingListTableHeaderCell = styled(VestingListTableCell)`
  font-weight: bold;
`

export const LockIcon = styled(IconLock)`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  /* position: absolute;
  left: -16px;
  top: 0;
  transform: rotate(60deg); */
`
