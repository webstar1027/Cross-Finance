import React, { ReactNode } from 'react'

import { Wrapper } from './styled'

interface AccordionProps {
  expanded: boolean
  children?: ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ expanded, children }) => {
  return <Wrapper expanded={expanded}>{children}</Wrapper>
}

export default Accordion
