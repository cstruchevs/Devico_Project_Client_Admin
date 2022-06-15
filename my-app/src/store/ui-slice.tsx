import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
  showLoginForm: boolean
  showCodeVerify: boolean
  showRecoverPass: boolean
  showChangePass: boolean
  showCreateUser: boolean
  showEditUser: boolean
  showInviteUsers: boolean
}

const initialState: SliceState = {
  showLoginForm: true,
  showCodeVerify: false,
  showRecoverPass: false,
  showChangePass: false,
  showCreateUser: false,
  showEditUser: false,
  showInviteUsers: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggleCodeVerify(state) {
       return {
        ...state,
        showCodeVerify: !state.showCodeVerify
      }
    },
    toggleRecoverPass(state) {
       return {
        ...state,
        showRecoverPass: !state.showRecoverPass
      }
    },
    toggleChangePass(state) {
       return {
        ...state,
        showChangePass: !state.showChangePass
      }
    },
    toggleCreateUser(state) {
       return {
        ...state,
        showCreateUser: !state.showCreateUser
      }
    },
    toggleEditUser(state) {
       return {
        ...state,
        showEditUser: !state.showEditUser
      }
    },
    toggleInviteUsers(state) {
       return {
        ...state,
        showInviteUsers: !state.showInviteUsers
      }
    },
    toggleLoginForm(state) {
      return {
        ...state,
        showLoginForm: !state.showLoginForm
      }
    },
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
