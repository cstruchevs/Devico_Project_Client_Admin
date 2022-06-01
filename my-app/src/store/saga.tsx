import callApi from '../services/callApi'
import { sagaActions } from './sagaActions'
import { call, takeEvery, put, Effect, SagaReturnType } from 'redux-saga/effects'
import { authActions } from './auth'

const { setUser } = authActions

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

export default function* rootSaga() {
  yield takeEvery(sagaActions.TWO_FACTOR_AUTH, twoFactorAuth)
  yield takeEvery(sagaActions.TWO_FACTOR_VERIFY, twoFactorVerify)
  yield takeEvery(sagaActions.CHANGE_PASSWORD, changePassword)
}
