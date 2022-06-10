import callApi from '../services/callApi'
import { sagaActions } from './sagaActions'
import { call, takeEvery, put, Effect, SagaReturnType } from 'redux-saga/effects'
import { authActions } from './auth'
import { usersActions } from './users'
import { notificationActions } from './notifications'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { NotificationStatus } from './notifications'

const { setUser } = authActions
const { setUsers, deleteUser } = usersActions
const { setNotification } = notificationActions

const addUserToLocalStorage = ({
  user,
  token,
}: {
  user: { id: string; email: string }
  token: string
}) => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
}

export function* twoFactorAuth(action: Effect): any {
  try {
    const { email, password } = action.payload
    const data = yield call(() => {
      return callApi.post('/two-factor-login', { email, password })
    })
    const { user, token, secretToken } = data.data
    localStorage.setItem('secretToken', secretToken)
    addUserToLocalStorage({ user, token })
  } catch (error) {
    console.log(error)
  }
}

export function* twoFactorVerify(action: Effect): any {
  try {
    const { code } = action.payload
    const secretToken = localStorage.getItem('secretToken')
    yield call(() => {
      return callApi.post('/two-factor-verify', { secretToken, code })
    })
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    yield put(setUser({ user }))
  } catch (error) {
    console.log(error)
  }
}

export function* changePassword(action: Effect): any {
  try {
    const { password, token } = action.payload
    yield call(() => {
      return callApi.post('/change-password', { password, token })
    })
  } catch (error) {
    console.log(error)
  }
}

export function* getUsers(action: Effect) {
  try {
    const { page, limit } = action.payload
    const response: AxiosResponse = yield call(callApi.get, `/user/all/${page}/${limit}`)
    yield put(setUsers({ users: response.data.data.users, count: response.data.data.count }))
  } catch (error) {
    console.log(error)
  }
}

export function* deleteUserSaga(action: Effect) {
  try {
    const { email } = action.payload
    console.log({ ...action.payload })
    const response: AxiosResponse = yield call(callApi.delete, `/user/${email}`)
    console.log(response)
    yield put(deleteUser({ email }))
  } catch (error) {
    console.log(error)
  }
}

export function* createUserSaga(action: Effect) {
  try {
    console.log(action.payload)
    const response: AxiosResponse = yield call(callApi.post, `/register`, { ...action.payload })
    console.log(response)
    yield put(
      setNotification({
        notification: {
          message: 'User has been successfully created',
          status: NotificationStatus.success,
          date: moment(),
        },
      }),
    )
  } catch (error) {
    console.log(error)
  }
}

export function* editUserSaga(action: Effect) {
  try {
    console.log(action.payload)
    yield call(callApi.patch, `/user`, { ...action.payload })
    yield put(
      setNotification({
        notification: {
          message: 'User has been successfully edited',
          status: NotificationStatus.success,
          date: moment(),
        },
      }),
    )
  } catch (error) {
    console.log(error)
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.TWO_FACTOR_AUTH, twoFactorAuth)
  yield takeEvery(sagaActions.TWO_FACTOR_VERIFY, twoFactorVerify)
  yield takeEvery(sagaActions.CHANGE_PASSWORD, changePassword)
  yield takeEvery(sagaActions.GET_USERS, getUsers)
  yield takeEvery(sagaActions.DELETE_USER, deleteUserSaga)
  yield takeEvery(sagaActions.EDIT_USER, editUserSaga)
  yield takeEvery(sagaActions.ADD_USER, createUserSaga)
}
