import { createSlice } from '@reduxjs/toolkit'
import { ActionReducer } from './index'

export interface IDriversData {
  representiveFullName?: string
  nickname?: string
  representiveLicense?: string
  city?: string
  sportDriverLicense?: string
  regAdress?: string
  driverLicense?: string
  idNumber?: string
  phone?: string
  dob?: Date
}

export interface IUsersInterface {
  id: string
  email: string
  fullName?: string
  phone?: string
  driversData: IDriversData
}

interface IAuthSlice {
  users: IUsersInterface[]
  count: number
}

const initialState: IAuthSlice = {
  users: [],
  count: 0,
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUsers(state, action: ActionReducer<{ users: IUsersInterface[]; count: number }>) {
      const newState = state
      newState.count = action.payload.count
      action.payload.users.forEach(user => {
        const index = newState.users.findIndex(object => object.id === user.id)
        if(index === -1) {
          newState.users = [...newState.users, user] 
        }
      })
      return newState
    },
    deleteUser(state, action: ActionReducer<{ email: string }>) {
      return {
        ...state,
        users: state.users.filter(item => {
          return item.email !== action.payload.email
        }),
      }
    },
  },
})

export const usersActions = usersSlice.actions

export default usersSlice
