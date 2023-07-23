import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button } from '@crosswiselabs/uikit'
import { BodyFont } from 'style/typography'
import { useTranslation } from 'contexts/Localization'
import { API_URL } from 'config'
import useFetch from 'hooks/useFetch'

import { ButtonWrapper, ReferredListContainer } from './styled'

interface IReferredListProps {
  totalCount: number
}

const ReferredList: React.FC<IReferredListProps> = ({ totalCount }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { getRequest } = useFetch()

  const [referredUsers, setReferredUsers] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  const loadReferredUsers = async (_currentPage, _account) => {
    try {
      setReferredUsers([])
      const data = await getRequest(`${API_URL}/profiles/referred_users/${_account}/${_currentPage}`)
      setReferredUsers(data)
    } catch (error: any) {
      setReferredUsers([])
    }
  }

  useEffect(() => {
    if (account) {
      loadReferredUsers(0, account)
    }

    // eslint-disable-next-line
  }, [account])

  const onPagePrev = () => {
    loadReferredUsers(currentPage - 1, account)
    setCurrentPage(currentPage - 1)
  }
  const onPageNext = () => {
    loadReferredUsers(currentPage + 1, account)
    setCurrentPage(currentPage + 1)
  }
  return (
    <ReferredListContainer>
      {referredUsers.map((user, index) => (
        <BodyFont mt="8px" fontWeight={700} key={user}>
          {currentPage * 10 + index + 1}. {user.slice(0, 10)} . . . {user.slice(37, 42)}
        </BodyFont>
      ))}
      <ButtonWrapper>
        <Button variant="primaryGradient" onClick={onPagePrev} disabled={currentPage === 0}>
          {t('Prev')}
        </Button>
        <Button
          variant="primaryGradient"
          onClick={onPageNext}
          disabled={currentPage === Math.floor((totalCount - 1) / 10)}
        >
          {t('Next')}
        </Button>
      </ButtonWrapper>
    </ReferredListContainer>
  )
}
export default ReferredList
