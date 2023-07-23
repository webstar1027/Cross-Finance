import { ethers } from 'ethers'
import { useSCrssTokenContract } from 'hooks/useContract'
import { useCallback } from 'react'

const useConvert2SCrss = (_crssAmount) => {
  const sCrssTokencontract = useSCrssTokenContract()
  const convert2SCrss = useCallback(async () => {
    try {
      const tx = await sCrssTokencontract.enter(ethers.utils.parseEther(_crssAmount))
      const receipt = await tx.wait()
      return receipt.status
    } catch (e: any) {
      return false
    }
  }, [sCrssTokencontract, _crssAmount])

  return { convert2SCrss }
}

const useConvert2Crss = (_sCrssAmount) => {
  const sCrssTokencontract = useSCrssTokenContract()
  const convert2Crss = useCallback(async () => {
    try {
      const tx = await sCrssTokencontract.leave(ethers.utils.parseEther(_sCrssAmount))
      const receipt = await tx.wait()
      return receipt.status
    } catch (e: any) {
      return false
    }
  }, [sCrssTokencontract, _sCrssAmount])

  return { convert2Crss }
}

export { useConvert2SCrss, useConvert2Crss }
