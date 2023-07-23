import { useCallback, useEffect, useState } from 'react'
import { ethers, Contract, BigNumber } from 'ethers'
import { useCrssTokenContract, useSCrssTokenContract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import { useWeb3React } from '@web3-react/core'
import { BIG_TEN, MAX_UINT256 } from 'utils/bigNumber'

const useApproveCRSS = (lpContract: Contract) => {
  const crssTokencontract = useCrssTokenContract()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await lpContract.approve(crssTokencontract.address, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e: any) {
      return false
    }
  }, [lpContract, crssTokencontract])

  return { onApprove: handleApprove }
}

function useSCrssAllowance() {
  const crssTokencontract = useCrssTokenContract()
  const sCrssTokencontract = useSCrssTokenContract()
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from(0))
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  const getAllowance = useCallback(async () => {
    if (account) {
      const data: BigNumber = await crssTokencontract.allowance(account, sCrssTokencontract.address)
      setAllowance(data)
    }
  }, [crssTokencontract, sCrssTokencontract.address, account])

  useEffect(() => {
    getAllowance()
  }, [slowRefresh, getAllowance])

  return allowance
}

function useSCrssApprove() {
  const crssTokencontract = useCrssTokenContract()
  const sCrssTokenContract = useSCrssTokenContract()
  const approveSCrss = useCallback(async () => {
    try {
      const tx = await crssTokencontract.approve(sCrssTokenContract.address, MAX_UINT256)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e: any) {
      return false
    }
  }, [crssTokencontract, sCrssTokenContract.address])

  return { approveSCrss }
}

export { useApproveCRSS, useSCrssAllowance, useSCrssApprove }
