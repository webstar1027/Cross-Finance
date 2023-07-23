import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import {
  // Text,
  useMatchBreakpoints,
  UserIcon,
  CopyIcon,
  // DropDownBottomIcon,
  CheckmarkIcon,
  Checkbox,
  Flex,
  // Button,
} from '@crosswiselabs/uikit'
// import { useThemeManager } from 'state/user/hooks'
import useToast from 'hooks/useToast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useUserInfo, registerUserInfo } from 'state/personalAccount/hooks'
import { AutoColumn } from 'components/Layout/Column'
import { useTranslation } from 'contexts/Localization'
import { API_URL } from 'config'
import QuestionHelper from 'components/QuestionHelper'

import {
  StyledPage,
  ResponsiveHeading,
  // HeadingDescription,
  AccountCardWrapper,
  AccountCard,
  AccountCardMainInfo,
  SettingTitle,
  AddressContainer,
  SubTitle,
  CheckBoxTitle,
  AccountAreaContainer,
  GeneralSettingsInfo,
  SettingsInfo,
  StyledInput,
  StyledButton,
  CompensationLists,
  StyledText,
  TransactionLists,
  SubInput,
} from './styled'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { library } = useActiveWeb3React()
  const { toastError, toastSuccess } = useToast()
  const [userError, setUserError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const { data, transacData, transacStatus } = useUserInfo()

  const [userName, setUserName] = useState(data?.name || '')
  const [email, setEmail] = useState(data?.email || '')
  const [discordUserName, setDiscordUserName] = useState(data?.discord || '')
  const [tgUsername, setTgUsername] = useState(data?.telegram || '')

  const [optEmail, setOptEmail] = useState(data?.notification?.email || false)
  const [optTelegram, setOptTelegram] = useState(data?.notification?.telegram || false)
  const [optDiscord, setOptDiscord] = useState(data?.notification?.discord || false)
  const [autoVesting, setAutoVesting] = useState(data?.autoVesting || false)
  const [autoCompound, setAutoCompound] = useState(data?.autoCompound || false)
  const [copied, setCopied] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { isXs, isSm, isMd } = useMatchBreakpoints()
  const isMobile = isXs || isSm || isMd
  const tokenLists = Object.keys(transacData.reserve || {})
  const reserveLists = Object.values(transacData.reserve || {})
  const depositLists = Object.values(transacData.deposit || {})
  const txHistory = transacData.history || []

  const accountText = useMemo(() => {
    if (account) {
      return isMobile ? `${account.slice(0, 10)}  . . .  ${account.slice(37, 42)}` : account
    }
    return ''
  }, [isMobile, account])

  useEffect(() => {
    setUserName(data?.name || '')
    setEmail(data?.email || '')
    setTgUsername(data?.telegram || '')
    setDiscordUserName(data?.discord || '')
    setOptEmail(data?.notification?.email || false)
    setOptTelegram(data?.notification?.telegram || false)
    setOptDiscord(data?.notification?.discord || false)
    setAutoVesting(data?.autoVesting || false)
    setAutoCompound(data?.autoCompound || false)
  }, [data])

  const onSuccess = () => {
    toastSuccess(t('Success'), t('Successfully Registered'))
    setUserError(false)
    setEmailError(false)
  }
  const onFailure = (err) => {
    toastError(t('Register Failed'), t(err.message))
  }

  const handleClick = () => {
    if (!userName) {
      toastError(t('Register Failed'), t('You must input your name'))
      setUserError(true)
      return
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toastError(t('Register Failed'), t('Invalid Email'))
      setEmailError(true)
      return
    }

    axios
      .get(`${API_URL}/profiles/nonce/${account}`)
      .then((_info) => {
        if (_info.status === 200) {
          const signer = library.getSigner()
          signer
            .signMessage(_info.data)
            .then((signatureHash) => {
              dispatch(
                registerUserInfo(
                  {
                    address: account,
                    name: userName,
                    email,
                    telegram: tgUsername,
                    discord: discordUserName,
                    notification: {
                      email: optEmail,
                      telegram: optTelegram,
                      discord: optDiscord,
                    },
                    autoVesting,
                    autoCompound,
                    signatureHash,
                  },
                  onSuccess,
                  onFailure,
                ),
              )
            })
            .catch(() => {
              toastError(t('Signin Failed'), t('User cancelled sign in'))
            })
        }
      })
      .catch(() => {
        toastError(t('Register Failed'), t('Failed to sign in'))
      })
  }

  return (
    <>
      <StyledPage>
        <AutoColumn justify={isMobile ? 'center' : 'flex-start'}>
          <ResponsiveHeading mb="12px" color="text">
            {t('Personal Account Area')}
          </ResponsiveHeading>
          {/* <HeadingDescription isMobile={isMobile} >
            {t('Your Account Settings')}
          </HeadingDescription> */}
        </AutoColumn>
        <AccountCardWrapper>
          <AccountCard isMobile={isMobile}>
            <AccountCardMainInfo>
              <UserIcon />
              <AddressContainer>
                <SubTitle>{t('Wallet')}</SubTitle>
                <AccountAreaContainer>
                  {accountText || 'Connect your wallet'}
                  {copied ? (
                    <CheckmarkIcon width="26px" />
                  ) : (
                    <CopyIcon
                      width="26px"
                      color="primaryText"
                      cursor="pointer"
                      onClick={() => {
                        setCopied(true)
                        setTimeout(() => {
                          setCopied(false)
                        }, 3000)
                        navigator.clipboard.writeText(account)
                      }}
                    />
                  )}
                </AccountAreaContainer>
              </AddressContainer>
            </AccountCardMainInfo>
            <SettingsInfo>
              <GeneralSettingsInfo>
                <SettingTitle>{t('Contact Information')}</SettingTitle>
                <SubInput>
                  <SubTitle>{t('Username')}</SubTitle>
                  <StyledInput
                    err={userError}
                    placeholder={t('Set a username')}
                    onChange={(e) => {
                      setUserName(e.target.value)
                    }}
                    value={userName}
                  />
                </SubInput>
                <SubInput>
                  <SubTitle>{t('Email')}</SubTitle>
                  <StyledInput
                    err={emailError}
                    placeholder={t('Your email address')}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    value={email}
                  />
                </SubInput>
                <Flex alignItems="center" mt="20px">
                  <div style={{ width: 25 }}>
                    <Checkbox
                      scale="sm"
                      checked={optEmail}
                      onChange={() => {
                        setOptEmail(!optEmail)
                      }}
                    />
                  </div>
                  <CheckBoxTitle>{t('Opt-in for Email notifications')}</CheckBoxTitle>
                </Flex>
              </GeneralSettingsInfo>
              <GeneralSettingsInfo>
                <SubInput>
                  <SubTitle>{t('Telegram Username')}</SubTitle>
                  <StyledInput
                    placeholder={t('Your telegram username')}
                    onChange={(e) => {
                      setTgUsername(e.target.value)
                    }}
                    value={tgUsername}
                  />
                </SubInput>
                <Flex alignItems="center" mt="20px">
                  <div style={{ width: 25 }}>
                    <Checkbox
                      scale="sm"
                      checked={optTelegram}
                      onChange={() => {
                        setOptTelegram(!optTelegram)
                      }}
                    />
                  </div>
                  <CheckBoxTitle>{t('Opt-in for Telegram notifications')}</CheckBoxTitle>
                </Flex>
                <SubInput>
                  <SubTitle>{t('Discord Username')}</SubTitle>
                  <StyledInput
                    placeholder={t('Your Discord username')}
                    onChange={(e) => {
                      setDiscordUserName(e.target.value)
                    }}
                    value={discordUserName}
                  />
                </SubInput>

                <Flex alignItems="center" mt="20px">
                  <div style={{ width: 25 }}>
                    <Checkbox
                      scale="sm"
                      checked={optDiscord}
                      onChange={() => {
                        setOptDiscord(!optDiscord)
                      }}
                    />
                  </div>
                  <CheckBoxTitle>{t('Opt-in for Discord notifications')}</CheckBoxTitle>
                </Flex>
                <StyledButton variant="primaryGradient" onClick={handleClick}>
                  {t('Apply Changes')}
                </StyledButton>
              </GeneralSettingsInfo>
            </SettingsInfo>
          </AccountCard>
        </AccountCardWrapper>
      </StyledPage>
      {transacStatus && (
        <Flex justifyContent="space-between" padding="24px" flexDirection={isMobile ? 'column' : 'row'}>
          <CompensationLists flexDirection="column">
            {tokenLists.map((token, index) => (
              <div>
                {index === 0 && (
                  <Flex flexDirection="row">
                    <StyledText width="40%" color="homeTitle">
                      Asset
                    </StyledText>
                    <StyledText width="30%" color="homeTitle">
                      Reserve
                    </StyledText>
                    <StyledText width="30%" color="homeTitle">
                      Deposit
                    </StyledText>
                  </Flex>
                )}
                <Flex flexDirection="row">
                  <StyledText width="40%">{token}</StyledText>
                  <StyledText width="30%">{reserveLists[index]}</StyledText>
                  <StyledText width="30%">{depositLists[index]}</StyledText>
                </Flex>
              </div>
            ))}
          </CompensationLists>
          <TransactionLists flexDirection="column">
            {txHistory.map((tx, index) => (
              <div>
                {index === 0 && (
                  <Flex flexDirection="row">
                    <StyledText width="25%" color="homeTitle">
                      Tx
                    </StyledText>
                    <StyledText width="25%" color="homeTitle">
                      Asset
                    </StyledText>
                    <StyledText width="25%" color="homeTitle">
                      From
                    </StyledText>
                    <StyledText width="25%" color="homeTitle">
                      To
                    </StyledText>
                  </Flex>
                )}
                <Flex flexDirection="row">
                  <StyledText width="25%">{tx.tx}</StyledText>
                  <StyledText width="25%">{tx.asset}</StyledText>
                  <StyledText width="25%">{tx.from}</StyledText>
                  <StyledText width="25%">{tx.to}</StyledText>
                </Flex>
              </div>
            ))}
          </TransactionLists>
        </Flex>
      )}
    </>
  )
}

export default Home
