import { InjectedModalProps } from '@crosswiselabs/uikit'
import { Currency } from '@crosswise/sdk'

export interface Props extends InjectedModalProps {
  currencies: (Currency | undefined)[]
}
