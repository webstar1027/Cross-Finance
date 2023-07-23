import React, { useState, useEffect, useCallback, useRef } from 'react'
import useInterval from 'hooks/useInterval'
import { CollapseWrapper } from './styled'

interface CollapseProps {
  isOpen: boolean
}

const Collapse: React.FC<CollapseProps> = ({ isOpen, children }) => {
  const [childHeight, setChildHeight] = useState('0')
  const content = useRef<HTMLDivElement>(null)

  const fetchChildHeight = useCallback(() => {
    if (content.current) {
      const childHeightRaw = content.current.clientHeight
      setChildHeight(`${childHeightRaw / 16}rem`)
    }
  }, [content])

  // fetch all lists every 10 minutes, but only after we initialize library
  useInterval(fetchChildHeight, 200)

  return (
    <CollapseWrapper
      style={{
        maxHeight: isOpen ? childHeight : 0,
      }}
    >
      <div ref={content}>{children}</div>
    </CollapseWrapper>
  )
}

export default Collapse
