import { CssBaseline } from '@mui/material'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { IUserInterface } from '../store/auth'
import ChangePassword from './ChangePasswordModal/ChangePasswordModal'
import CreateUser from './CreateUser/CreateUser'
import EditUser from './EditUser/EditUser'
import InviteUserModal from './InviteUserModal/InviteUserModal'
import SideBarAdmin from './SideBarAdmin/SideBarAdmin'
import TopNavbar from './TopNavbar/TopNavbar'

interface ILayout {
  children?: JSX.Element | JSX.Element[]
}

const Layout: FC<ILayout> = ({ children }) => {
  const user = useSelector<RootState, IUserInterface | null>(state => state.auth.user)
  return (
    <>
      <CssBaseline />
      <ChangePassword />
      <CreateUser />
      <InviteUserModal />
      <EditUser />
      {user && <SideBarAdmin />}
      {user && <TopNavbar />}
      <main>{children}</main>
    </>
  )
}

export default Layout
