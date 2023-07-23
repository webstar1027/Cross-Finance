import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { Box, Text, Toggle, Flex, InjectedModalProps, ChartLIcon, Modal } from '@crosswiselabs/uikit'
import { useAudioModeManager, useExpertModeManager, useUserSingleHopOnly } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { useSwapActionHandlers } from 'state/swap/hooks'
import usePersistState from 'hooks/usePersistState'
// import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import { CrosswiseToggleWrapper, ModalNoPadContainer, OptionLabel, Divider } from './styled'

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const { isDark } = useTheme()
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [rememberExpertModeAcknowledgement, setRememberExpertModeAcknowledgement] = usePersistState(false, {
    localStorageKey: 'pancake_expert_mode_remember_acknowledgement',
  })
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
  const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setRememberExpertModeAcknowledgement={setRememberExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (rememberExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <Modal
      title={t('Transaction Settings')}
      icon={<ChartLIcon color={isDark ? 'contrast' : 'bluePalette.accent'} />}
      width="346px"
      onDismiss={onDismiss}
    >
      <ModalNoPadContainer>
        {/* <Flex flexDirection="column">
          <Text bold textTransform="uppercase" fontSize="12px" color="secondary" mb="24px">
            {t('Swaps & Liquidity')}
          </Text>
        </Flex> */}
        <TransactionSettings />
        <Divider />
        <Box px="25px" py="20px">
          <Flex justifyContent="flex-end" alignItems="center" mb="16px">
            <OptionLabel>{t('Expert Mode')}</OptionLabel>
            <Toggle id="toggle-expert-mode-button" scale="md" checked={expertMode} onChange={handleExpertModeToggle} />
          </Flex>
          <Flex justifyContent="flex-end" alignItems="center" mb="16px">
            <OptionLabel>{t('Disable Multihops')}</OptionLabel>
            <Toggle
              id="toggle-disable-multihop-button"
              checked={singleHopOnly}
              scale="md"
              onChange={() => {
                setSingleHopOnly(!singleHopOnly)
              }}
            />
          </Flex>
          <Flex justifyContent="flex-end" alignItems="center">
            <OptionLabel>{t('Audio')}</OptionLabel>
            <CrosswiseToggleWrapper>
              <Toggle checked={audioPlay} onChange={toggleSetAudioMode} scale="md" />
            </CrosswiseToggleWrapper>
          </Flex>
        </Box>
        <Divider />
      </ModalNoPadContainer>
    </Modal>
  )
}

export default SettingsModal
