import styled, { css, keyframes } from 'styled-components'
import { Image, Text, Button, Flex, Input } from '@crosswiselabs/uikit'
import FlexLayout from 'components/Layout/Flex'
import Select from 'components/Select/Select'
import SvgButton from 'components/SvgButton'
import { IconTotalStaked, IconPendingRewards } from 'components/SvgIcons'
import { BodyFont } from 'style/typography'

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

export const FarmHeader = styled.div`
  /* padding-top: 72px; */
  padding-bottom: 32px;

  max-width: 1400px;
  margin: auto;
  display: flex;
  @media only screen and (min-width: 370px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`

export const FarmHeaderLayout = styled.div`
  width: 100%;
  position: relative;
`

export const StyledPage = styled.div`
  width: 100%;
`

export const StyledContainer = styled.div<{ active?: boolean }>`
  position: relative;
  // overflow: hidden;

  border: solid 1px transparent;
  background-image: ${({ theme }) =>
    theme.isDark
      ? `${theme.colors.backgroundAlt}, linear-gradient(rgb(70, 68, 101), rgb(70, 68, 101))`
      : `linear-gradient(#FAFBFB, #FAFBFB), linear-gradient(#DBE2EB, #DBE2EB)`};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  ${({ theme }) =>
    !theme.isDark &&
    css`
      box-shadow: 0px 4px 12px 0px #00000017;
    `}

  &:hover {
    background-image: ${({ theme }) =>
      `${theme.isDark ? theme.colors.backgroundAlt : 'linear-gradient(#FAFBFB, #FAFBFB)'}, ${
        theme.colors.gradients.gradprimary
      }`};
  }

  ${({ active }) =>
    active &&
    css`
      background-image: ${({ theme }) =>
        `${theme.isDark ? theme.colors.backgroundAlt : 'linear-gradient(#FAFBFB, #FAFBFB)'}, ${
          theme.colors.gradients.gradprimary
        }`};
    `}

  &:active {
    box-shadow: 0px 0px 10px 2px rgba(135, 80, 244, 0.65);
  }
`

export const FarmHeadCard = styled(StyledContainer)<{ isMobile: boolean }>`
  border-radius: ${({ theme }) => theme.radii.card};
  border-top-left-radius: 0px;
  ${({ isMobile }) =>
    isMobile &&
    css`
      border-top-right-radius: 0px;
    `}
`

export const FarmHeadCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(196, 196, 196, 0.1);
`

export const FarmHeadCardTitle = styled.div`
  display: flex;
  align-items: center;
`

export const TotalStakedValueIcon = styled.div`
  /* background-image: url('/images/icons/TotalStakedValueIcon.png'); */
  width: 14px;
  height: 14px;
  /* margin-right: 15px; */
`

export const PendingRewardIcon = styled.div`
  /* background-image: url('/images/icons/PendingRewardIcon.png'); */
  width: 14px;
  height: 14px;
  /* margin-right: 15px; */
`

export const FarmHeadCardEarningPanelWrapper = styled(Flex)`
  max-width: 520px;
  width: 35%;
`

export const FarmHeadCardEarningPanel = styled.div`
  position: relative;
  display: grid;
  /* grid-template-columns: auto auto; */
  grid-template-columns: auto;
  /* max-width: 520px; */
  width: 100%;
  border-radius: 6px;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  padding: 10px 0 12px 0;
`

export const FarmHeaderCardEarningDivider = styled.div`
  --margin-top: 9px;

  position: absolute;
  margin: var(--margin-top) 0;
  left: 50%;
  height: calc(100% - var(--margin-top) * 2);
  width: 1px;
  background-color: #c4c4c4;
  opacity: 0.1;
`

export const Crss2sCrssConverterWrapper = styled(StyledContainer)<{ isMobile: boolean }>`
  width: 100%;
  margin: auto;
  margin-top: ${({ isMobile }) => (isMobile ? '10px' : '16px')};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: ${({ isMobile }) => (isMobile ? '10px 10px 15px 13px' : '20px 20px 25px 23px')};
  transition: box-shadow 0.5s;
  position: relative;
`

export const ConverterContainer = styled(StyledContainer)<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ isMobile }) => (!isMobile ? 'row' : 'column')};
  justify-content: space-around;
  align-items: center;
`

export const CRSSInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 47px;
  border-radius: 6px;
`

export const CRSSAmountInput = styled(Input)`
  border-radius: 6px;
  padding-left: 27px;
  font-size: 16px;
  line-height: 33px;
  width: 100%;
  height: 47px;
  letter-spacing: 0.035em;
  color: ${({ theme }) => (theme.isDark ? '#FDFDFD' : '#000')};
  outline: none;
  border: none;
  text-align: right;

  &:focus {
    box-shadow: none !important;
    border: solid 1px transparent;
    background-image: ${({ theme }) =>
      theme.isDark
        ? `linear-gradient(#2E2D44, #2E2D44), ${theme.colors.gradients.gradprimary}`
        : `linear-gradient(#FAFBFB, #FAFBFB), ${theme.colors.gradients.gradprimary}`};
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: #787b87;
  }
`

export const CRSSIcon = styled.div`
  background-image: url('/images/tokens/crss.svg');
  position: absolute;
  width: 24px;
  height: 24px;
  background-size: cover;
  left: 8px;
  top: 12px;
`

export const SCRSSIcon = styled.div`
  background-image: url('/images/tokens/scrss.svg');
  position: absolute;
  width: 24px;
  height: 24px;
  background-size: cover;
  left: 8px;
  top: 12px;
`

export const SwapIcon = styled.div`
  background-image: url('/images/swap.svg');
  width: 24px;
  height: 24px;
  background-size: cover;
  cursor: pointer;
  transition: 0.1s;
  margin: 10px 0px;
  &:hover {
    opacity: 0.7;
    transform: rotateZ(180deg);
  }
`

export const CRSSInputLabel = styled(BodyFont)`
  position: absolute;
  left: 40px;
  top: 13px;
`

export const HeadCardOperationPanelWrapper = styled.div<{ isMobile: boolean }>`
  width: 100%;
  margin: auto;
  margin-top: ${({ isMobile }) => (isMobile ? '10px' : '16px')};
  position: relative;
`

export const FarmHeadCardOperationPanel = styled(StyledContainer)<{ isMobile: boolean }>`
  border-radius: ${({ theme }) => theme.radii.card};
  /* height: 176px; */
  width: 100%;
  padding: ${({ isMobile }) => (isMobile ? '10px 10px 15px 13px' : '20px 20px 25px 23px')};
  transition: box-shadow 0.5s;
`

export const CardViewIcon = styled.div`
  background-image: url('/images/icons/CardViewIcon.png');
  background-size: cover;
  width: 22px;
  height: 22px;
  margin-right: 13px;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.25;
  }
`

export const ListViewIcon = styled(CardViewIcon)`
  background-image: url('/images/icons/ListViewIcon.png');
`

export const StyledSvgButton = styled(SvgButton)`
  margin-right: 13px;
`

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 47px;
  margin-top: 27px;
  margin-bottom: 16px;
  /* box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.85); */
  border-radius: 6px;
`

export const SearchInputBox = styled(Input)`
  background-color: rgba(245, 255, 252, 0.1);
  border-radius: 6px;
  padding-left: 27px;
  font-size: 16px;
  line-height: 33px;
  width: 100%;
  height: 47px;
  letter-spacing: 0.035em;
  color: ${({ theme }) => (theme.isDark ? '#FDFDFD' : '#000')};
  outline: none;
  border: none;

  &:focus {
    box-shadow: none !important;
    border: solid 1px transparent;
    background-image: ${({ theme }) =>
      theme.isDark
        ? `linear-gradient(#2E2D44, #2E2D44), ${theme.colors.gradients.gradprimary}`
        : `linear-gradient(#FAFBFB, #FAFBFB), ${theme.colors.gradients.gradprimary}`};
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: #787b87;
  }
`

export const SearchIcon = styled.div`
  background-image: url('/images/icons/SearchIcon.png');
  position: absolute;
  top: 17px;
  left: 8px;
  width: 13px;
  height: 13px;
`

export const ActiveFinishButtons = styled(Button)<{ checked?: boolean }>`
  color: white;
  padding: 10px 7px;
  height: 35px;
  margin: 20px 0px;

  ${({ theme, checked }) =>
    checked
      ? css`
          background: linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%);
          background-clip: border-box;
          -webkit-text-fill-color: inherit;
        `
      : theme.isDark &&
        css`
          &:hover {
            background: linear-gradient(92.63deg, rgba(63, 129, 239, 0.65) -1.76%, rgba(135, 80, 244, 0.65) 107.38%);
          }
        `}
  &:hover {
    box-shadow: 0px 0px 10px 2px rgba(135, 80, 244, 0.65);
  }
  font-size: 12px;
`

export const StyledSelect = styled(Select)`
  height: 25px;
  position: relative;
  & > div {
    height: 100%;
    &:first-child {
      --borderWidth: 1px;
      --background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.12) 0%,
          rgba(255, 255, 255, 0.06) 45.83%,
          rgba(255, 255, 255, 0) 100%
        ),
        #25272c;

      background: var(--background);
      background-clip: padding-box;
      border: solid var(--borderWidth) transparent;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        margin: calc(0px - var(--borderWidth));
        border-radius: inherit;
        background: linear-gradient(90deg, #8c39ff 100%, #21bbff 100%);
      }
    }
    &:last-child {
      z-index: 1000;
      top: 26px;
      li {
        padding: 0 16px;
      }
    }
  }
`

export const HeaderTopBar = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: ${({ isMobile }) => (isMobile ? 'center' : 'flex-start')};
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`

export const HeaderInfo = styled.div`
  margin-top: 24px;
  margin-bottom: 38px;
  display: grid;
  grid-gap: 20px;
  justify-content: space-between;
  grid-template-columns: repeat(3, auto);
`

export const HeaderInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HeaderInfoIcon = styled.div`
  width: 38px;
  height: 38px;
  background-color: rgba(245, 255, 252, 0.1);
  background-repeat: no-repeat;
  box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  background-position: center;
`

export const HeaderInfoVolumeIcon = styled(HeaderInfoIcon)`
  background-image: url('/images/icons/VolumeIcon.png');
`

export const HeaderInfoTotalValueLockedIcon = styled(HeaderInfoIcon)`
  background-image: url('/images/icons/TotalValueLockedIcon.png');
`

export const HeaderInfoTotalLiquidityIcon = styled(HeaderInfoIcon)`
  background-image: url('/images/icons/TotalLiquidityIcon.png');
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;

  > ${Text} {
    font-size: 16px;
    padding-right: 8px;
  }
`

export const LabelNameText = styled(Text)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.svgColor};
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

export const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

export const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

export const Planet1 = styled.div`
  position: absolute;
  z-index: -1;
  top: 35px;
  left: -50px;
`

export const Planet2 = styled.div`
  position: absolute;
  z-index: -1;
  bottom: -150px;
  right: -80px;
`

export const Planet3 = styled.div`
  position: absolute;
  z-index: -1;
`

export const CardWrapper = styled.div`
  display: flex;
`

export const CardItem = styled.div`
  display: flex;
  alignitems: center;
  padding-left: 0px;
`

export const CardItemLock = styled.div`
  display: flex;
  alignitems: center;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 100px;
  }
`

export const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

export const HarvestBtnGroup = styled.div`
  display: flex;
  alignitems: flex-end;
  justify-content: space-between;
  padding-top: 20px;
  @media only screen and (max-width: 760px) {
    flex-direction: column;
  }
`

export const StakingToggle = styled.div`
  display: flex;
  alignitems: baseline;
  padding: 10px 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0px;
  }
`

export const FarmUserInfo = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  @media only screen and (max-width: 760px) {
    justify-content: space-between;
    width: 100%;
  }
`

export const MassBtns = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 31px;
  margin-bottom: 20px;
  @media only screen and (max-width: 760px) {
    margin-top: 20px;
  }
  @media only screen and (max-width: 568px) {
    font-size: 13px;
    padding: 0px 10px;
    margin-top: 5px;
    flex-direction: column;
  }
  > button {
    box-shadow: none;
    @media only screen and (max-width: 760px) and (min-width: 568px) {
      font-size: 15px;
      padding: 0px 10px;
    }
    @media only screen and (max-width: 568px) {
      font-size: 13px;
      padding: 0px 10px;
      margin-top: 5px;
      margin-right: 0px;
    }
  }
`

export const FarmCardsLayout = styled(FlexLayout)<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMobile }) => `repeat(auto-fit, min(${isMobile ? '100%' : '420px'}))`};
  /* grid-gap: 50px; */
  row-gap: 50px;
  column-gap: 3px;
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'space-between')};
  @media screen and (max-width: 1400px) {
    grid-template-columns: ${({ isMobile }) => `repeat(auto-fit, min(${isMobile ? '100%' : '345px'}))`};
  }
`

export const StyledIconPendingRewards = styled(IconPendingRewards)`
  fill: ${({ theme }) => theme.colors.primaryGray};
`

export const StyledIconTotalStaked = styled(IconTotalStaked)`
  fill: ${({ theme }) => theme.colors.primaryGray};
`

export const ToolTipText = styled.div`
  font-size: 15px;
  line-height: 130%;
  color: ${({ theme }) => theme.colors.primaryGray};

  & > a {
    color: #3f81ef;
    &:hover {
    }
  }
`

export const FillMaxButton = styled.span`
  cursor: pointer;
  color: rgb(59 130 246);
  font-weight: 500;
  font-size: 13px;
  transition: 0s;

  &:hover {
    color: rgb(147 197 253);
  }
`
