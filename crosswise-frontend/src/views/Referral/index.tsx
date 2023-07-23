import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Flex, Button, useMatchBreakpoints, Skeleton, useTooltip } from '@crosswiselabs/uikit'
import { API_URL } from 'config'
// import { useThemeManager } from 'state/user/hooks'
import useFetch from 'hooks/useFetch'
import useToast from 'hooks/useToast'
import ConnectWalletButton from 'components/ConnectWalletButton'
import QuestionHelper from 'components/QuestionHelper'
import { RowFixed } from 'components/Layout/Row'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { BodyFont, H5, PreTitle } from 'style/typography'
import { useReferralCommissions, useTotalCommissions, useVestingRewards } from './hooks/useReferralCommissions'
import useReferralsReferrer from './hooks/useReferralsReferrer'

import {
  // StyledCenter,
  StyledPage,
  // CardsRow,
  // Label,
  ResponsiveHeading,
  ReferralCardWrapper,
  // ReferralCard,
  // ReferralCardMainInfo,
  // ReferralCardIconWrapper,
  // ReferralCardIcon,
  CrssBotWrapper,
  ReferralLinkContainer,
  ReferralLinkTitle,
  ReferralUrlContainer,
  StyledIconCopy,
  StyledIconCheck,
  // DropDownIcon,
  ReferralDetailInfoWrapper,
  ReferralDetailInfo,
  ReferralStatsContainer,
  ReferralStatsItem,
  // Divider,
  ReferralDesc,
  ReferredMembersWrapper,
  ReferralUrlInput,
  // ReferrerContainer,
  // StyledTextBox as TextBox,
} from './styled'
import CrssBot from './CrssBot'
import ReferredList from './components/ReferredList'

const Referral: React.FC = () => {
  // const [isExpanded, setIsExpanded] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [referralCode, setReferralCode] = useState('')
  const [referralCount, setReferralCount] = useState(0)
  const referrer = useReferralsReferrer()
  const [sendingTx, setSendingTx] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  // const [isDark] = useThemeManager()
  const { isXs, isSm, isMd } = useMatchBreakpoints()
  const { toastSuccess, toastError } = useToast()
  const { getRequest, postRequest } = useFetch()
  const history = useHistory()
  const { pathname, search } = useLocation()
  const ref = new URLSearchParams(search).get('ref')

  const { origin } = window.location
  const referralUrl = `${origin}/?ref=${referralCode}`

  const { referralRewards, claimReferralCommission } = useReferralCommissions()
  const totalCommission = useTotalCommissions()
  const vestingRewards = useVestingRewards()
  const balanceNumber = getBalanceNumber(referralRewards).toLocaleString(undefined, { maximumFractionDigits: 2 })

  const { targetRef, tooltip } = useTooltip(<span>Copied!</span>, { placement: 'top' })

  useEffect(() => {
    const setRef = async () => {
      const response = await postRequest(`${API_URL}/profiles/set_referrer/${ref}/${account}`, {})
      if (response.success) {
        toastSuccess('Success', `You set referrer successfully.`)
        // setReferrer(ref)
        history.push(pathname)
      } else if (response?.response?.data?.msg) {
        const errMsg = response.response.data.msg
        toastError('Error', errMsg)
        history.push(pathname)
      }
    }
    if (account && ref && referrer && parseInt(referrer) === 0) setRef()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, account, referrer])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRequest(`${API_URL}/profiles/referral_code/${account}`)
      setReferralCode(data?.refCode || '')
      setReferralCount(data?.referredCount || 0)
      // setReferrer(data?.referrer || '')
    }
    if (account) fetchData()
  }, [getRequest, account])

  const isMobile = isXs || isSm || isMd

  const handleCopyLink = () => {
    if (!account) return
    navigator.clipboard.writeText(referralUrl)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  const handleClaimRewards = async () => {
    setSendingTx(true)
    await claimReferralCommission()
    setSendingTx(false)
  }

  return (
    <>
      <StyledPage isMobile={isMobile}>
        <ResponsiveHeading>{t('Moonwalkers!')}</ResponsiveHeading>
        <ReferralCardWrapper isMobile={isMobile}>
          <CrssBotWrapper>
            <CrssBot />
          </CrssBotWrapper>
          <ReferralLinkContainer isMobile={isMobile}>
            <ReferralDesc>
              {t(
                "Share your referral link to invite friends and followers. You'll earn 1% of referred users' rewards FOREVER! Every user can only be referred before their first sign-in, so make sure they join using your link. A referred user's vested earnings will result in vested referral earnings. You will be able to claim those once the vesting period ends.",
              )}
            </ReferralDesc>
            <ReferralLinkTitle>{t('Your Referral Link')}</ReferralLinkTitle>
            <ReferralUrlContainer ref={targetRef} isMobile={isMobile} onClick={handleCopyLink}>
              {account ? <ReferralUrlInput value={referralUrl} readOnly /> : <Skeleton width="100%" />}
              {account && (
                <>
                  <StyledIconCopy visible={!isCopied} />
                  <StyledIconCheck visible={isCopied} />
                </>
              )}
            </ReferralUrlContainer>
          </ReferralLinkContainer>
          <ReferralDetailInfoWrapper>
            <ReferralDetailInfo>
              <ReferralStatsContainer>
                <ReferralStatsItem isMobile={isMobile}>
                  <RowFixed>
                    <H5 gradient="btngradprimary">{t('Total Referrals')}</H5>
                    <QuestionHelper
                      text={t('The total number of users that joined using your link and have earned some rewards.')}
                      ml="4px"
                      placement="top-start"
                    />
                  </RowFixed>
                  <BodyFont mt="8px" fontWeight={700}>
                    {account ? referralCount : <Skeleton width={50} />}
                  </BodyFont>
                </ReferralStatsItem>
                <ReferralStatsItem isMobile={isMobile}>
                  <RowFixed>
                    <H5 gradient="btngradprimary">
                      Total Rewards <br />
                      Earned
                    </H5>
                    <QuestionHelper text={t('Your total earnings over time')} ml="4px" placement="top-start" />
                  </RowFixed>
                  <BodyFont mt="8px" fontWeight={700}>
                    {account ? vestingRewards : <Skeleton width={50} />}
                  </BodyFont>
                </ReferralStatsItem>
                <ReferralStatsItem isMobile={isMobile}>
                  <RowFixed>
                    <H5 gradient="btngradprimary">{t('Rewards in Vesting')}</H5>
                    <QuestionHelper
                      text={t('The total of pending rewards that are still in vesting.')}
                      ml="4px"
                      placement="top-start"
                    />
                  </RowFixed>
                  <BodyFont mt="8px" fontWeight={700}>
                    {account ? totalCommission : <Skeleton width={50} />}
                  </BodyFont>
                </ReferralStatsItem>
                <ReferralStatsItem isMobile={isMobile}>
                  <RowFixed>
                    <H5 gradient="btngradprimary">{t('Unclaimed Rewards')}</H5>
                    <QuestionHelper text={t('Your current unclaimed balance.')} ml="4px" placement="top-start" />
                  </RowFixed>
                  <BodyFont mt="8px" fontWeight={700}>
                    {account ? `${balanceNumber} CRSS` : <Skeleton width={100} />}
                  </BodyFont>
                  <PreTitle mt="8px">{account ? t(`~ ${balanceNumber} USD`) : <Skeleton width={100} />}</PreTitle>
                </ReferralStatsItem>
              </ReferralStatsContainer>

              <Flex justifyContent="center" alignItems="center" mb={10}>
                {account ? (
                  <Button variant="primaryGradient" isLoading={sendingTx} onClick={handleClaimRewards} width="100%">
                    {t('Claim Rewards')}
                  </Button>
                ) : (
                  <ConnectWalletButton scale="sm" variant="primaryGradient" width="100%" />
                )}
              </Flex>
            </ReferralDetailInfo>
          </ReferralDetailInfoWrapper>

          {referralCount > 0 && (
            <ReferredMembersWrapper>
              <ReferralDetailInfo>
                <ReferralStatsItem isMobile={isMobile}>
                  <H5 gradient="btngradprimary">{t('Last Referred')}</H5>
                  <ReferredList totalCount={referralCount} />
                </ReferralStatsItem>
              </ReferralDetailInfo>
            </ReferredMembersWrapper>
          )}
        </ReferralCardWrapper>

        {isCopied && tooltip}
      </StyledPage>
    </>
  )
}

export default Referral
