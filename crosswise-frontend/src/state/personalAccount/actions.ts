import { createAction } from '@reduxjs/toolkit'

export interface PersonalInfo {
  address?: string
  name?: string
  email?: string
  telegram?: string
  discord?: string
  notification?: {
    email: boolean
    telegram: boolean
    discord: boolean
  }
  autoVesting?: boolean
  autoCompound?: boolean
}

export const setUserInfo = createAction<{ status: boolean; data: PersonalInfo }>('personalAccount/getUserInfo')
export const setTransacInfo = createAction<{ status: boolean; data: any }>('personalAccount/getTransacInfo')
