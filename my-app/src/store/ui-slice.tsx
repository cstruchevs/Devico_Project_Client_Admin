import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
  showCodeVerify: boolean
  showRecoverPass: boolean
  showChangePass: boolean
}

const initialState: SliceState = {
  showCodeVerify: false,
  showRecoverPass: false,
  showChangePass: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggleCodeVerify(state) {
      state.showCodeVerify = !state.showCodeVerify
    },
    toggleRecoverPass(state) {
      state.showRecoverPass = !state.showRecoverPass
    },
    toggleChangePass(state) {
        state.showChangePass = !state.showChangePass
      },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
