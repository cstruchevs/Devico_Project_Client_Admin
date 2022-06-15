import React, { FC, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RootState } from '../store'
import { IUserInterface } from '../store/auth'
import checkLocalStorage from '../services/checkLocalStorage'

interface IPageRoutes {}

const LoginPage = React.lazy(() => import('../pages/LoginPage/LoginPage'))
const UsersPage = React.lazy(() => import('../pages/UserPage/UserPage'))
const UserPage = React.lazy(() => import('../pages/UserInfoPage/UserInfoPage'))

const PageRoutes: FC<IPageRoutes> = () => {
  const user = useSelector<RootState, IUserInterface | null>(state => state.auth.user)
  
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users"element={(user) ? <UsersPage/> : <Navigate to="/" />} />
        <Route path="/user-info/:userId"element={ <UserPage/>}  />
      </Routes>
    </Suspense>
  )
}

export default PageRoutes
