// import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { API_URL } from 'config'
import { AppState } from '../index'
import { setUserInfo, setTransacInfo } from './actions'

export function useUserInfo(): AppState['personalAccount'] {
  return useSelector<AppState, AppState['personalAccount']>((state) => state.personalAccount)
}

export const fetchUserInfo = (address) => (dispatch) => {
  axios.get(`${API_URL}/profiles/${address}`).then((info) => {
    dispatch(setUserInfo({ status: info.status === 200, data: info.data }))
  })
}

export const registerUserInfo = (data, onSuccess, onFailure) => (dispatch) => {
  axios
    .post(`${API_URL}/profiles/${data.address}`, { ...data })
    .then((info) => {
      onSuccess()
      dispatch(setUserInfo({ status: info.status === 200, data: info.data }))
    })
    .catch((err) => onFailure(err))
}

export const fetchTransacInfo = (address) => (dispatch) => {
  axios.get(`${API_URL}/wallet_info/address/${address}`).then((info) => {
    dispatch(setTransacInfo({ status: info.data.status, data: info.data.data }))
  })
}
