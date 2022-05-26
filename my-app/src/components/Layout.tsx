import { CssBaseline } from '@mui/material'
import { FC } from 'react'
import SideBarAdmin from './SideBarAdmin/SideBarAdmin'
import TopNavbar from './TopNavbar/TopNavbar'

interface ILayout {
  children?: JSX.Element | JSX.Element[]
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <SideBarAdmin />
      <TopNavbar />
      <main>{children}</main>
    </>
  )
}

export default Layout
