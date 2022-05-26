import React, { FC, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

interface IPageRoutes {}

const UsersPage = React.lazy(() => import('../pages/UserPage/UserPage'))

const PageRoutes: FC<IPageRoutes> = () => {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Routes>
        <Route path="/" element={<UsersPage />} />
      </Routes>
    </Suspense>
  )
}

export default PageRoutes
