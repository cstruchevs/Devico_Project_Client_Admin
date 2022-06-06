import { FC } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import UsersTables from '../../components/UsersTable/UsersTable'
import { StyledUsersPageBox } from './UserPageStyles'

interface IUsersPage {}

const UsersPage: FC<IUsersPage> = () => {
  return (
    <section>
      <UsersTables />
    </section>
  )
}

export default UsersPage
