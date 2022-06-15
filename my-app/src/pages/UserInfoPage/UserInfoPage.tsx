import { Grid, Stack } from '@mui/material'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import UserData from '../../components/UserInfoComponents/UserData/UserData'
import UserDriversData from '../../components/UserInfoComponents/UserDriversData/UserDriversData'
import UserInfoHeader from '../../components/UserInfoComponents/UserInfoHeader/UserInfoHeader'
import { sagaActions } from '../../store/sagaActions'

interface IUserInfoPage {}

const UserInfoPage: FC<IUserInfoPage> = () => {
  let { userId } = useParams()

  return (
    <section>
      <Stack direction='column'>
        <UserInfoHeader userId={userId} />
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <UserData userId={userId} />
          </Grid>
          <Grid item xs={6} md={8}>
            <UserDriversData userId={userId} />
          </Grid>
          <Grid item md={12}></Grid>
        </Grid>
      </Stack>
    </section>
  )
}

export default UserInfoPage
