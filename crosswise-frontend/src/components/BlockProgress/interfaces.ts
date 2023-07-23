import { ProgressProps } from '@crosswiselabs/uikit'

export interface BlockProgressProps extends ProgressProps {
  startBlock: number
  endBlock: number
}
