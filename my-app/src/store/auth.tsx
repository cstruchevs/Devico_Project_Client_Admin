import { createSlice } from '@reduxjs/toolkit'
import { ActionReducer } from './index'

export interface IUserInterface {
  name: string
  id: string
  email: string
  status?: string
}

interface IAuthSlice {
  user: IUserInterface | null
  qrcode: string
}

const initialState: IAuthSlice = {
  user: null,
  qrcode: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, action: ActionReducer<{ user: IUserInterface}>) {
      state.user = action.payload.user
    },
    logOutUser(state) {
      state.user = null
    },
    setQRCode(state, action: ActionReducer<{ qrcode: string}>) {
      return {
        ...state,
        qrcode: action.payload.qrcode
      }
    },
  },
})

export const authActions = authSlice.actions

export default authSlice
