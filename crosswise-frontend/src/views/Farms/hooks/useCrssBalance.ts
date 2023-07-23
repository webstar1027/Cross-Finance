import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import useRefresh from 'hooks/useRefresh'
import { useCrssTokenContract, useSCrssTokenContract } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'

function useCrssBalance() {
  const crssTokencontract = useCrssTokenContract()
  const [balance, setBalance] = useState(0)
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  const getBalance = useCallback(async () => {
    if (account) {
      const data: BigNumber = await crssTokencontract.balanceOf(account)
      setBalance(data.div(BIG_TEN.pow(18).toString()).toNumber())
    }
  }, [crssTokencontract, account])

  useEffect(() => {
    getBalance()
  }, [slowRefresh, getBalance])

  return balance
}

function useSCrssBalance() {
  const sCrssTokencontract = useSCrssTokenContract()
  const [balance, setBalance] = useState(0)
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  const getBalance = useCallback(async () => {
    if (account) {
      const data = await sCrssTokencontract.balanceOf(account)
      setBalance(data.div(BIG_TEN.pow(18).toString()).toNumber())
    }
  }, [sCrssTokencontract, account])

  useEffect(() => {
    getBalance()
  }, [slowRefresh, getBalance])

  return balance
}

const useEstimateSCrssOutput = (_crssAmount, _impactFeeOn = true) => {
  const sCrssTokencontract = useSCrssTokenContract()
  const estimateSCrssOutput = useCallback(async () => {
    try {
      const data = await sCrssTokencontract.CRSStoSCRSS(
        new BigNumber(_crssAmount).multipliedBy(BIG_TEN.pow(18)).toString(),
        _impactFeeOn,
      )

      // console.log(data.sCrssAmount.dividedBy(BIG_TEN.pow(18)))
      return parseFloat(new BigNumber(data.sCrssAmount.toString()).div(BIG_TEN.pow(18)).toFixed(3))
    } catch (e: any) {
      return 0
    }
  }, [sCrssTokencontract, _crssAmount, _impactFeeOn])

  return { estimateSCrssOutput }
}
const useEstimateCrssOutput = (_sCrssAmount, _impactFeeOn = true) => {
  const sCrssTokencontract = useSCrssTokenContract()
  const estimateCrssOutput = useCallback(async () => {
    try {
      const data = await sCrssTokencontract.sCRSStoCRSS(
        new BigNumber(_sCrssAmount).multipliedBy(BIG_TEN.pow(18)).toString(),
        _impactFeeOn,
      )

      // console.log(data.sCrssAmount.dividedBy(BIG_TEN.pow(18)))
      return parseFloat(new BigNumber(data.crssAmount.toString()).div(BIG_TEN.pow(18)).toFixed(3))
    } catch (e: any) {
      return 0
    }
  }, [sCrssTokencontract, _sCrssAmount, _impactFeeOn])

  return { estimateCrssOutput }
}

export { useCrssBalance, useSCrssBalance, useEstimateSCrssOutput, useEstimateCrssOutput }
