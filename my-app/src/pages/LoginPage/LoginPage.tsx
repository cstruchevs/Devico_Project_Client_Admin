import { FC } from 'react'
import LoginCodeVerify from '../../components/LoginForm/LoginCodeVerify/LoginCodeVerify'
import LoginForm from '../../components/LoginForm/LoginForm'

interface ILoginPage {}

const LoginPage: FC<ILoginPage> = () => {
  return (
    <>
    <LoginForm />
    <LoginCodeVerify />
    </>
  )
}

export default LoginPage
