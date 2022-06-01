import React, { FC, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RootState } from '../store'
import { IUserInterface } from '../store/auth'
import checkLocalStorage from '../services/checkLocalStorage'

interface IPageRoutes {}

const UsersPage = React.lazy(() => import('../pages/UserPage/UserPage'))
const LoginPage = React.lazy(() => import('../pages/LoginPage/LoginPage'))

const PageRoutes: FC<IPageRoutes> = () => {
  const user = useSelector<RootState, IUserInterface | null>(state => state.auth.user)
  
  const userLocalStorage = checkLocalStorage()
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/users"element={(user || userLocalStorage) ? <UsersPage/> : <Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default PageRoutes
