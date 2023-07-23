import React, { useState, useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { TextBox } from 'components/Texts'
import { TokenPairImage, Flex, Text, ArrowDropDownIcon, Button, Toggle } from '@crosswiselabs/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import tokens from 'config/constants/tokens'
import LinearChart from 'components/Graph/LinearChart'
import { LineChartLoader } from 'views/Info/components/ChartLoaders'
import { getHistoricalData } from '../Chart/helpers'
import { Container, ChartHeader, TokenPairWrapper, StyledButton, StyledDropdown } from './styled'

// const quoteCurrency = {
//   symbol: 'USDT',
//   address: '0x55d398326f99059fF775485246999027B3197955',
//   pair: '0x21d398F619a7A97e0CAb6443fd76Ef702B6dCE8D',
//   exchangeName: 'Crss',
// }

const BasicChart = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const selectTerms = [
    { label: 'Daily', value: 5 },
    { label: 'Weekly', value: '2H' },
    { label: 'Monthly', value: '1D' },
    { label: 'Annual', value: '1W' },
  ]
  const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // const input = CRSS_TOKEN_ADDRESS[chainId]
  const input = '0x99FEFBC5cA74cc740395D65D384EDD52Cb3088Bb'
  let filteredData
  const routerVersion = 'crss'
  const [chartData, setChartData] = useState([])
  const [currentTerm, setCurrentTerm] = useState(t('Daily'))
  const [currentPair, setCurrentPair] = useState(0)

  const tokendetails = useMemo(() => {
    return [
      {
        name: 'Crss Token',
        pair: 'CRSS-BUSD',
        symbol: 'CRSS',
        version: 'CRSS DEX',
        switchLabel: 'CRSS-BNB',
        preTicker: '$',
        suffTicker: '',
      },
      {
        name: 'Crss Token',
        pair: 'CRSS-WBNB',
        symbol: 'CRSS',
        version: 'CRSS DEX',
        switchLabel: 'CRSS-BUSD',
        preTicker: '',
        suffTicker: 'BNB',
      },
    ][currentPair]
  }, [currentPair])

  const quoteCurrency = useMemo(() => {
    return [
      {
        symbol: 'BUSD',
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        pair: '0xb9b09264779733b8657b9b86970e3db74561c237',
        exchangeName: 'Crss',
      },
      {
        symbol: 'BNB',
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        pair: '0xb5d85cA38a9CbE63156a02650884D92A6e736DDC',
        exchangeName: 'Crss',
      },
    ][currentPair]
  }, [currentPair])

  const [resolution, setResolution] = useState(5)
  const [, setPriceHover] = useState<number | undefined>()
  const [, setPriceDateHover] = useState<string | undefined>()
  const fetchChartData = async () => {
    const data = await getHistoricalData(input, quoteCurrency, routerVersion, resolution, chainId)
    const getFullDate = (time) => {
      if (currentTerm === t('Daily')) return `${time.getHours()}:${time.getMinutes()}`
      if (currentTerm === t('Weekly')) return `${t(Month[time.getMonth()])} ${time.getDate()}`
      return `${time.getDate()}/${time.getMonth()}`
    }
    filteredData = data.map((semidata) => {
      const time = new Date(semidata.time)
      const fullDate = getFullDate(time)
      return { value: semidata.low.toFixed(5), time: fullDate, fullTime: time, volume: semidata.volume.toFixed(5) }
    })
    setChartData(filteredData)
  }
  const termChanged = (term) => {
    setCurrentTerm(term.label)
    setResolution(term.value)
  }
  React.useEffect(() => {
    fetchChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolution, currentPair])

  return (
    <Container flexDirection="column">
      <ChartHeader flexDirection="row" justifyContent="space-between">
        <Flex alignItems="center">
          <TokenPairWrapper>
            <TokenPairImage
              primarySrc="/images/tokens/crss.svg"
              secondarySrc={`/images/tokens/${quoteCurrency.address}.svg`}
              height={26}
              width={26}
            />
          </TokenPairWrapper>
          <Text fontSize="16px" fontWeight={700} ml="8px">
            {tokendetails.pair}
          </Text>
        </Flex>
        <Flex>
          <Flex alignItems="center">
            <Toggle checked={currentPair === 0} onChange={() => setCurrentPair(1 - currentPair)} scale="md" />
            <Text width={110} textAlign="center">
              {tokendetails.switchLabel}
            </Text>
          </Flex>

          <StyledDropdown
            placement="bottom"
            list={selectTerms.map((item) => ({
              value: item.value,
              label: t(item.label),
            }))}
            component={
              <StyledButton variant="thirdGradientOutline" endIcon={<ArrowDropDownIcon width="15px" />}>
                <Text color="primaryText" fontSize="11px" fontWeight="bold">
                  {currentTerm}
                </Text>
              </StyledButton>
            }
            current={currentTerm}
            onClickItem={(item) => termChanged(item)}
          />
          <RouterLink to="/exchange">
            <Button width="114px" height="35px" variant="primaryGradient" ml="30px">
              {/* <Text fontSize="12px" fontWeight="600"> */}
              {t('Go To Dex')}
              {/* </Text> */}
            </Button>
          </RouterLink>
        </Flex>
      </ChartHeader>
      <Flex width="100%" flex={1} justifyContent="center">
        {!chartData || chartData.length === 0 ? (
          <LineChartLoader />
        ) : (
          <LinearChart
            data={chartData}
            setHoverValue={setPriceHover}
            setHoverDate={setPriceDateHover}
            preTicker={tokendetails.preTicker}
            suffTicker={tokendetails.suffTicker}
          />
        )}
      </Flex>
    </Container>
  )
}

export default BasicChart
