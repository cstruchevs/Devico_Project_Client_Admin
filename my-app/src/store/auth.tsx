import { createSlice } from '@reduxjs/toolkit'
import { ActionReducer } from './index'

export interface IUserInterface {
  id: string
  email: string
  password?: string
  phone?: string
  fullName?: string
}

interface IAuthSlice {
  user: IUserInterface | null
  token: string

}

const initialState: IAuthSlice = {
  user: null,
  token: '',

}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, action: ActionReducer<{ user: IUserInterface; token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logOutUser(state) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      state.user = null
    },
  },
})

export const authActions = authSlice.actions

export default authSlice
