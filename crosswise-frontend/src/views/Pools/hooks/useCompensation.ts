import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import { useRepay } from 'hooks/useContract'
import { getBalanceNumber } from 'utils/formatBalance'
import { API_URL } from 'config'

export const fetchCompensationInfo = async (address) => {
  const { data } = await axios.get(`${API_URL}/compensation/${address}`)
  return !!data.doc
}

const useCompensation = () => {
  const repayContract = useRepay()
  const { account } = useWeb3React()
  const getUserState = useCallback(async () => {
    try {
      const data = await repayContract.getUserState(account)
      const vestList = await repayContract.getVestList(account)
      return {
        pendingCrss: getBalanceNumber(new BigNumber(data.pendingCrss._hex)),
        staked: getBalanceNumber(new BigNumber(data._deposit._hex)),
        withdrawable: getBalanceNumber(new BigNumber(data.withdrawable._hex)),
        isLoaded: true,
        vestList,
      }
    } catch (e: any) {
      return {
        pendingCrss: 0,
        staked: 0,
        withdrawable: 0,
        isLoaded: true,
        vestList: [],
      }
    }
  }, [repayContract, account])
  const handleClaim = useCallback(
    async (isVesting) => {
      try {
        await repayContract.harvestRepay(isVesting)
        return true
      } catch (e: any) {
        // console.log('Error: ', e)
        return false
      }
    },
    [repayContract],
  )
  // useEffect(()=>{})
  return { getUserState, handleClaim }
}

export default useCompensation
