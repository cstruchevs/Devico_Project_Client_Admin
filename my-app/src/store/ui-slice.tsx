import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
  showCodeVerify: boolean
  showRecoverPass: boolean
  showChangePass: boolean
  showCreateUser: boolean
  showEditUser: boolean
}

const initialState: SliceState = {
  showCodeVerify: false,
  showRecoverPass: false,
  showChangePass: false,
  showCreateUser: false,
  showEditUser: false,
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
    toggleCreateUser(state) {
      state.showCreateUser = !state.showCreateUser
    },
    toggleEditUser(state) {
      state.showEditUser = !state.showEditUser
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
