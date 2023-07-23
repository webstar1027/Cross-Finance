import styled from 'styled-components'
import { Image, Text } from '@crosswiselabs/uikit'
import FlexLayout from 'components/Layout/Flex'
import Select from 'components/Select/Select'

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

export const FarmHeaderLayout = styled.div<{ isMobile?: boolean }>`
  width: 100%;
  position: relative;
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
  color: ${({ theme }) => (theme.isDark ? 'white' : '#00b8b9')};
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

export const FarmUserInfo = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  @media only screen and (max-width: 760px) {
    justify-content: space-between;
    width: 100%;
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
