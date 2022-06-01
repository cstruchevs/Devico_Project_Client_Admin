import { FC } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

interface ILoginPage {}

const LoginPage: FC<ILoginPage> = () => {
  return (
    <>
      <LoginForm />
    </>
  )
}

export default LoginPage
