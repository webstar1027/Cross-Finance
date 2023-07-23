import styled from 'styled-components'
// import useTheme from 'hooks/useTheme'
import Page from 'components/Layout/Page'
import { Text, Input, Button, Flex } from '@crosswiselabs/uikit'
import { FieldLabel, H1, H5 } from 'style/typography'

export const StyledPage = styled(Page)`
  overflow: show;
  padding-top: 0;
`

export const CompensationLists = styled(Flex)`
  // background: ${({ theme }) => theme.colors.homeCardBackground};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid rgba(224, 224, 255, 0.24);
  box-shadow: 1px 4px 44px 1px #0000004d;
  border-radius: 23px;
  padding: 20px 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 30%;
  }
  width: 100%;
`
export const TransactionLists = styled(Flex)`
  // background: ${({ theme }) => theme.colors.homeCardBackground};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid rgba(224, 224, 255, 0.24);
  box-shadow: 1px 4px 44px 1px #0000004d;
  border-radius: 23px;
  padding: 20px 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 60%;
  }
  width: 100%;
`
export const ResponsiveHeading = styled(H1)`
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    text-align: left;
  }
`
export const HeadingDescription = styled(H5)``

export const AccountCardWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  position: relative;
`

export const AccountCard = styled.div<{ isMobile: boolean }>`
  padding: ${({ isMobile }) => (isMobile ? '16px 5px 16px 5px' : '14px 32px 36px 32px')};
  // background: ${({ theme }) => theme.colors.homeCardBackground};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid rgba(232, 241, 250, 0.12);
  box-sizing: border-box;
  box-shadow: 1px 4px 44px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`

export const AccountCardMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: solid 1px rgba(196, 196, 196, 0.1);
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const SettingTitle = styled(Text)`
  font-family: genos;
  font-size: 16px;
  font-weight: 700;
`

export const AccountCardIcon = styled.div`
  background: url('/images/icons/ReferralIcon.png');
  background-size: cover;
  width: 23px;
  height: 27px;
  margin-right: 10px;
`

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  width: 100%;
  position: relative;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
`

export const SubTitle = styled(FieldLabel)`
  margin: 20px 0px;
`

export const CheckBoxTitle = styled(SubTitle)`
  margin: 0px 20px;
`

export const AccountAreaContainer = styled.div`
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.45)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  border-radius: 6px;
  padding: 18px 16px;
  position: relative;
  vertical-align: middle;
  height: 47px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => theme.mediaQueries.md} {
    width: calc(100% - 130px);
  }
`

export const GeneralSettingsInfo = styled.div`
  width: 100%;
  padding: 0 0 10px 0;
  position: relative;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 50%;
    padding: 0 30px 10px 0;
  }
`

export const SettingsInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

export const StyledInput = styled(Input)<{ err: boolean }>`
  width: 100%;
  height: 47px;
  margin: 10px 0;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) => theme.isDark && 'inset 0px 1px 9px rgba(0, 0, 0, 0.45)'};
  border-radius: 6px;
  padding: 18px 16px;
  ${({ err }) => err && 'border: solid 1px'};
  ${({ err }) => err && 'border-color: red'};
`
export const StyledButton = styled(Button)`
  position: relative;
  margin: 10px;
  float: right;
  ${({ theme }) => theme.mediaQueries.md} {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`
export const StyledText = styled(Text)`
  text-align: center;
`
export const SubInput = styled.div`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 70%;
  }
`
