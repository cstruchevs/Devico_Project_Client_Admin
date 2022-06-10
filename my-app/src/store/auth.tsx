import { createSlice } from '@reduxjs/toolkit'
import { ActionReducer } from './index'

export interface IUserInterface {
  name: string
  id: string
  email: string
}

interface IAuthSlice {
  user: IUserInterface | null
}

const initialState: IAuthSlice = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, action: ActionReducer<{ user: IUserInterface}>) {
      state.user = action.payload.user
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
