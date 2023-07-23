import { InjectedModalProps } from '@crosswiselabs/uikit'

export interface ExpertModalProps extends InjectedModalProps {
  setShowConfirmExpertModal: (boolean) => void
  setRememberExpertModeAcknowledgement: (boolean) => void
}
