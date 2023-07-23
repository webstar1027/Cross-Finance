import { BoxProps } from '@crosswiselabs/uikit'
import { Placement } from '@popperjs/core'

export interface Props extends BoxProps {
  text: string | React.ReactNode
  icon?: 'help' | 'info'
  placement?: Placement
}
