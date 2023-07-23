import styled, { keyframes, css } from 'styled-components'
// import useTheme from 'hooks/useTheme'
import Page from 'components/Layout/Page'
import { BaseLayout, Text, DropDownBottomIcon, CheckmarkIcon } from '@crosswiselabs/uikit'
import { IconCopy } from 'components/SvgIcons'
import { TextBox } from 'components/Texts'
import { H1 } from 'style/typography'

export const StyledPage = styled(Page)<{ isMobile: boolean }>`
  /* background-image: url('/images/home/planets/planet-pluto.png'), url('/images/home/planets/planet-7.png');
  background-repeat: no-repeat;
  background-position: bottom center, top 120px right;
  background-size: 360px, 200px; */
  /* max-width: 920px; */
  overflow: show;
  padding: ${({ isMobile }) => `0 ${isMobile ? 10 : 24}px`};
  min-height: calc(100vh - 310px);
`

export const CardsRow = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  margin-top: 32px;
  width: 100%;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

export const Label = styled(Text)`
  /* opacity: 0.6; */
  color: ${({ theme }) => (theme.isDark ? '#FFF' : '#000')};
  font-size: 20px;
  @media (max-width: 600px) {
    font-size: 16px;
    text-align: center;
  }
`

export const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
`

export const ResponsiveHeading = styled(H1)`
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    text-align: left;
  }
`

export const CrssBotWrapper = styled.div`
  min-width: 210px;
  flex: 0 0;
`

export const ReferralCardWrapper = styled.div<{ isMobile?: boolean }>`
  width: 100%;
  margin-top: 40px;
  color: ${({ theme }) => theme.colors.text};
  position: relative;

  display: flex;
  gap: 20px;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
`

export const ReferralCard = styled.div<{ isMobile: boolean }>`
  padding: ${({ isMobile }) => (isMobile ? '16px 25px 16px 33px' : '14px 32px 36px 32px')};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: 8px 8px 24px 0 rgb(9 13 20 / 40%), -4px -4px 8px 0 rgb(224 224 255 / 4%), 0 1px 1px 0 rgb(9 13 20 / 40%);
  border: solid 1px rgba(224, 224, 255, 0.24);

  box-sizing: border-box;
  border-radius: 20px;
  /* opacity: 0.9; */
`

export const ReferralCardMainInfo = styled.div<{ isMobile: boolean }>`
  display: flex;
  ${({ isMobile }) => !isMobile && 'padding-right: 34px;'}
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: space-between;
  align-items: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')};
  position: relative;
`

export const ReferralCardIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 21px;
  font-weight: 700;
`

export const ReferralCardIcon = styled.div`
  background: url('/images/icons/ReferralIcon.png');
  background-size: cover;
  width: 23px;
  height: 27px;
  margin-right: 10px;
`

export const ReferralLinkContainer = styled.div<{ isMobile: boolean }>`
  /* display: grid;
  grid-template-columns: max-content auto;
  column-gap: 10px; */
  width: ${({ isMobile }) => (isMobile ? '100%' : 'calc(100% - 800px)')};
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  flex-direction: column;
  justify-content: space-between;
  /* align-items: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')}; */
  align-items: flex-start;
  width: ${({ isMobile }) => (isMobile ? '100%' : '')};
  position: relative;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 26px;
  font-weight: bold;
`

export const ReferralLinkTitle = styled(Text)`
  font-family: genos;
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  letter-spacing: 0.04em;
  margin: 16px 0;
`

export const ReferralUrlContainer = styled.div<{ isMobile: boolean }>`
  position: relative;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1), inset 2px 2px 6px rgba(0, 0, 0, 0.85);
  border-radius: 6px;
  padding: 18px 16px;
  padding-right: 60px;
  vertical-align: middle;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 16px;

  ${({ isMobile }) =>
    isMobile &&
    `
    margin-top: 16px;
  `}
`
export const ReferralUrlInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => (theme.isDark ? '#FFF' : '#000')};
`

const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: rotate(-720deg);
  }
  100% {
    opacity: 1;
    transform: rotate(0);
  }
`

const FadeOutAnimation = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0);
  }
  100% {
    opacity: 0;
    transform: rotate(-720deg);
  }
`

export const StyledIconCopy = styled(IconCopy)<{ visible: boolean }>`
  position: absolute;
  right: 24px;
  top: 15px;
  cursor: pointer;
  opacity: 1;
  stroke: ${({ theme }) => theme.colors.text};
  fill: ${({ theme }) => theme.colors.text};
  ${({ visible }) =>
    visible
      ? css`
          animation: ${FadeInAnimation} 0.5s ease 0.5s 1;
        `
      : css`
          animation: ${FadeOutAnimation} 0.5s ease 0s 1;
        `}
  animation-fill-mode: both;
`

export const StyledIconCheck = styled(CheckmarkIcon)<{ visible: boolean }>`
  position: absolute;
  right: 24px;
  top: 15px;
  cursor: pointer;
  opacity: 0;
  fill: #04f8ad;
  width: 25px;
  ${({ visible }) =>
    visible
      ? css`
          animation: ${FadeInAnimation} 0.5s ease 0.5s 1;
        `
      : css`
          animation: ${FadeOutAnimation} 0.5s ease 0s 1;
        `}
  animation-fill-mode: both;
`

export const DropDownIcon = styled(DropDownBottomIcon)`
  position: absolute;
  right: 22px;
  top: 22px;
  cursor: pointer;
`

export const ReferralDetailInfoWrapper = styled.div`
  flex: 0 0;
  min-width: 300px;

  border-radius: 20px;
  border: solid 1px transparent;
  background-image: ${({ theme }) =>
    `${theme.colors.gradients.gradsecondary}, ${theme.colors.gradients.btngradsecondary}`};
  background-origin: border-box;
  background-clip: padding-box, border-box;
`

export const ReferredMembersWrapper = styled.div`
  flex: 0 0;
  min-width: 300px;

  border-radius: 20px;
  border: solid 1px transparent;
  background-image: ${({ theme }) =>
    `${theme.colors.gradients.gradsecondary}, ${theme.colors.gradients.btngradsecondary}`};
  background-origin: border-box;
  background-clip: padding-box, border-box;
`

export const ReferralDetailInfo = styled.div<{ expanded?: boolean; isMobile?: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;

  min-height: 440px;

  // justify-content: start;
  // align-items: center;
  overflow: hidden;
  grid-gap: 20px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-sizing: border-box;
  box-shadow: 1px 4px 44px rgba(0, 0, 0, 0.3);
  border-radius: 20px;

  padding: 16px 26px 17px;
`

export const ReferralStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  /* background: rgba(245, 255, 252, 0.1); */
  /* box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  border-radius: 6px; */

  /* @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  } */
`

export const ReferralStatsItem = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
`

export const StyledTextBox = styled(TextBox)`
  background: linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%);
  background-clip: text;
  -webkit-background-clip: text;
  /* font-family: genos; */
  color: transparent;
`

export const Divider = styled.div`
  width: 1px;
  background-color: #c4c4c4;
  opacity: 0.1;

  /* @media (max-width: 600px) {
    width: 100%;
    height: 1px;
  } */
`

export const ReferrerContainer = styled.div`
  width: 100%;
  text-align: center;
`

export const ReferralDesc = styled(Text)`
  font-family: genos;
  font-size: 20px;
`
