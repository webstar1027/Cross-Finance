import styled from 'styled-components'

export const CollapseWrapper = styled.div`
  overflow: hidden;
  transition: 0.4s max-height;

  & > div {
    overflow: auto;
  }
`
