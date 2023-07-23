import { TextBox } from 'components/Texts'
import styled from 'styled-components'

export const ReferredListContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: space-around;
  margin-top: auto;
`

export const StyledTextBox = styled(TextBox)`
  background: linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%);
  background-clip: text;
  -webkit-background-clip: text;
  /* font-family: genos; */
  color: transparent;
`
