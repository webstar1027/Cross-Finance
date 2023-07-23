import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import useRefresh from 'hooks/useRefresh'
import { getCrssReferralContract } from 'utils/contractHelpers'

function useReferralsReferrer() {
  const [referrer, setReferrer] = useState('')
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
  const referralContract = getCrssReferralContract()

  const getReferrer = useCallback(async () => {
    if (account) {
      const data = await referralContract.getReferrer(account)
      setReferrer(data.toString())
    }
  }, [referralContract, account])

  useEffect(() => {
    getReferrer()
  }, [slowRefresh, getReferrer])

  return referrer
}

export default useReferralsReferrer
