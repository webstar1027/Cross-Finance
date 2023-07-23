import React from 'react'
import BigNumber from 'bignumber.js'
// import { useModal, CalculateIcon } from '@crosswiselabs/uikit'
import { useModal } from '@crosswiselabs/uikit'
import { useFarms } from 'state/farms/hooks'
import useLpPrice from 'hooks/useLpPrice'
import { getBalanceNumber } from 'utils/formatBalance'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { IconCalculator } from 'components/SvgIcons'
import { useTranslation } from 'contexts/Localization'
// import { StyledIconButton, CalculatorIcon } from './styled'
import { CalculatorIcon as Wrapper } from './styled'

export interface ApyButtonProps {
  lpLabel?: string
  // crssPrice?: BigNumber
  apr?: number
  displayApr?: string
  addLiquidityUrl?: string
  // className?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({
  lpLabel,
  // crssPrice,
  apr,
  displayApr,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const { data: farms } = useFarms()
  const selectedFarm = farms.find((item) => item?.lpSymbol?.toLowerCase() === `${lpLabel}`.toLowerCase())
  const lpPriceInUsd = useLpPrice(selectedFarm)
  const lpTokenBalance = getBalanceNumber(new BigNumber(selectedFarm?.userData?.stakedBalance || '0'))
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      symbol={lpLabel}
      linkLabel={t('Get %symbol%', { symbol: lpLabel })}
      tokenPrice={lpPriceInUsd.toNumber()}
      apr={apr}
      displayApr={displayApr}
      linkHref={addLiquidityUrl}
      isFarm
      max={lpTokenBalance}
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <Wrapper onClick={handleClickButton}>
      <IconCalculator />
    </Wrapper>
  )

  // return (
  //   <StyledIconButton
  //     className={className}
  //     onClick={handleClickButton}
  //     // variant="text"
  //     // scale="sm"
  //     // ml="10px"
  //   >
  //     {/* <CalculateIcon width="24px" /> */}
  //     <CalculatorIcon />
  //   </StyledIconButton>
  // )
}

export default ApyButton
