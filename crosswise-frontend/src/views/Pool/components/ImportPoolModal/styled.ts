import styled from 'styled-components'
import { Link } from '@crosswiselabs/uikit'
import { LightCard } from 'components/Card'

export const StyledButton = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border: solid 1px transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: ${({ theme }) =>
    `linear-gradient(${theme.isDark ? '#252436, #252436' : '#EAF2FA, #EAF2FA'}), 
    linear-gradient(92.63deg, #3F81EF -1.76%, #8750F4 107.38%)`};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: none;
  border-radius: 24px;
  width: 100%;
  height: 52px;
  padding: 8px;
  cursor: pointer;
`

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin: 1rem 0;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;

    > div {
      padding: 0;
    }
  }
`

export const StyledLightCard = styled(LightCard)`
  padding: 40px 10px;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`
