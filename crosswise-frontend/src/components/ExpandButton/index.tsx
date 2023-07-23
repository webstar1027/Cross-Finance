import React from 'react'
// import ExpandButtonBg from './icons/ExpandButtonBg'
import { ExpandButtonText, ExpandButtonWrapper, ExpandButtonOuterWrapper } from './styled'

interface Props {
  title: any
  radius?: string
  bgColor: string
  onClick?: () => void
}

const ExpandButton: React.FC<Props> = ({ title, onClick, radius, bgColor }) => {
  return (
    <ExpandButtonOuterWrapper radius={radius ?? '20px'}>
      <ExpandButtonWrapper radius={radius ?? '20px'}>
        <ExpandButtonText onClick={onClick} bgColor={bgColor} radius={radius ?? '20px'}>
          {title}
        </ExpandButtonText>
      </ExpandButtonWrapper>
    </ExpandButtonOuterWrapper>
  )
}

export default ExpandButton
