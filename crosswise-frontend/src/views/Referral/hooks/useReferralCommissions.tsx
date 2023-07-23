import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import useRefresh from 'hooks/useRefresh'
import { useMasterchef } from 'hooks/useContract'
import { getCrssReferralContract, getVestingContract } from 'utils/contractHelpers'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import { withdrawOutstandingRewards } from 'utils/calls'

const useReferralCommissions = () => {
  const [referralRewards, setReferralCommissions] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
  const referralContract = getCrssReferralContract()
  const masterChefContract = useMasterchef()

  // const getReferralRewards = useCallback(async () => {
  //   if (account) {
  //     const data = await referralContract.outstandingCommissions(account)
  //     setReferralCommissions(new BigNumber(data._hex))
  //   }
  // }, [referralContract, account])
  const getReferralRewards = async () => {
    if (account) {
      const data = await referralContract.outstandingCommissions(account)
      setReferralCommissions(new BigNumber(data._hex))
    }
  }

  const claimReferralCommission = useCallback(
    async () => {
      if (account) {
        try {
          const txHash = await withdrawOutstandingRewards(masterChefContract, referralRewards.toJSON())
          const receipt = await txHash.wait()
          await getReferralRewards()
          return receipt.status
        } catch (err: any) {
          return false
        }
      } else {
        return false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referralRewards, account],
  )

  useEffect(() => {
    getReferralRewards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slowRefresh])

  return { referralRewards, claimReferralCommission }
}

const useTotalCommissions = () => {
  const [totalCommission, setTotalCommssion] = useState(0)
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
  const referralContract = getCrssReferralContract()

  const getTotalCommission = async () => {
    if (account) {
      try {
        const data = await referralContract.getTotalComission(account)
        setTotalCommssion(new BigNumber(data._hex).div(BIG_TEN.pow(18)).toNumber())
      } catch (e: any) {
        setTotalCommssion(0)
      }
    }
  }

  useEffect(() => {
    getTotalCommission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slowRefresh, account])

  return totalCommission
}
const useVestingRewards = () => {
  const [vestingRewards, setVestinRewards] = useState(0)
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
  const vestingContract = getVestingContract()

  const getVestingRewards = async () => {
    if (account) {
      try {
        const data = await vestingContract.getPendingReferral(account)
        setVestinRewards(new BigNumber(data._hex).div(BIG_TEN.pow(18)).toNumber())
      } catch (e: any) {
        setVestinRewards(0)
      }
    }
  }

  useEffect(() => {
    getVestingRewards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slowRefresh, account])

  return vestingRewards
}

export { useReferralCommissions, useTotalCommissions, useVestingRewards }
