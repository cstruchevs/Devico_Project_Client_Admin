import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import authSlice from './auth'
import notificationSlice from './notifications'
import saga from './saga'
import uiSlice from './ui-slice'

export type RootState = ReturnType<typeof store.getState>

export interface ActionReducer<T = any> {
  payload: T
}

let sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
]

const store = configureStore({
  reducer: {
    notifications: notificationSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer
  },
  middleware,
})

sagaMiddleware.run(saga)

export default store
