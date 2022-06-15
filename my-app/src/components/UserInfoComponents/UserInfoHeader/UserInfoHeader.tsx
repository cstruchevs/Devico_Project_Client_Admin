import { Box } from '@mui/material'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import BackButton from '../../BackButton/BackButton'
import { TypographyInfo } from './UserInfoHeaderStyles'

interface IUserInfoHeader {
  userId: string | undefined
}

const UserInfoHeader: FC<IUserInfoHeader> = ({ userId }) => {
    
  const users = useSelector((state: RootState) => state.users.users)
  const theUser = users.find(user => {
    return user.id == userId
  })
  const userName = theUser?.fullName
  return (
    <Box sx={{ paddingLeft: '10px' }}>
      <BackButton />
      <TypographyInfo variant="h5">Edit User {userName}</TypographyInfo>
    </Box>
  )
}

export default UserInfoHeader
