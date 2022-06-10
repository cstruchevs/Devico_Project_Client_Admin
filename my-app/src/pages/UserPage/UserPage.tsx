import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from '../../components/LoginForm/LoginForm'
import UsersTables from '../../components/UsersTable/UsersTable'
import { sagaActions } from '../../store/sagaActions'
import { StyledUsersPageBox } from './UserPageStyles'

interface IUsersPage {}

const UsersPage: FC<IUsersPage> = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: sagaActions.GET_USERS, payload: { page: 0, limit: 5 } })
  })

  return (
    <section>
      <UsersTables />
    </section>
  )
}

export default UsersPage
