import styled from 'styled-components'
import { Input, Button } from '@crosswiselabs/uikit'
import { FieldLabel, PreTitle } from 'style/typography'

// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
export const CrosswiseToggleWrapper = styled.div`
  .pancakes {
    position: absolute;
  }
`

export const ModalNoPadContainer = styled.div`
  margin: 0px -25px 0px -25px;
`

export const ModalContainer = styled.div`
  padding: 20px 20px 0px 20px;
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #c4c4c4;
  opacity: 0.1;
`

export const SlippageButton = styled(Button)`
  width: 64px;
  // background: ${({ theme }) => theme.colors.input};
  border-radius: 6px;
  margin-right: 8px;
  font-size: 18px;
  line-height: 33px;
  letter-spacing: 0.035em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 0 0 auto;
`

export const OptionLabel = styled(FieldLabel)`
  margin-right: 8px;
`

export const StyledInput = styled(Input)`
  text-align: center;
  font-size: 18px;
  padding: 0px;
`
