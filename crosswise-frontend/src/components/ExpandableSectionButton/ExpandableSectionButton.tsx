import React from 'react'
import { ChevronDownIcon, ChevronUpIcon, Text } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import { ExpandableSectionButtonProps } from './interfaces'
import { Wrapper } from './styled'

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded = false }) => {
  const { t } = useTranslation()

  return (
    <Wrapper aria-label={t('Hide or show expandable content')} role="button" onClick={() => onClick()}>
      <Text color="textSecondary">{expanded ? t('HIDE DETAILS') : t('MORE DETAILS')}</Text>
      {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Wrapper>
  )
}

export default ExpandableSectionButton
