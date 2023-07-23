import React from 'react'
import styled from 'styled-components'
import { Flex } from '@crosswiselabs/uikit'
// import Footer from 'components/Menu/Footer'
import Nav from 'components/Menu/SubNav'
import PageMeta from 'components/Layout/PageMeta'

const StyledPage = styled.div`
  overflow: show;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 24px;
  padding-bottom: 0;
  min-height: calc(100vh - 64px);

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: calc(100vh - 64px);
  }
`

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 32px;

    > div {
      padding: 0;
    }
  }
`

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subTitle?: string
}

const Page: React.FC<PageProps> = ({ title, subTitle, children, ...props }) => {
  return (
    <StyledPage {...props}>
      <PageMeta />
      <ControlContainer>
        <Nav title={title} subTitle={subTitle} />
      </ControlContainer>
      {children}
      <Flex flexGrow={1} />
      {/* <Footer /> */}
    </StyledPage>
  )
}

export default Page
