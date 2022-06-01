import { FC } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

interface IUsersPage {}

const UsersPage: FC<IUsersPage> = () => {
  return (
    <section>
     <LoginForm />
    </section>
  )
}

export default UsersPage
