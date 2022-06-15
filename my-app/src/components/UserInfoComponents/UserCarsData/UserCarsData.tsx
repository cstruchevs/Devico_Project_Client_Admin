import { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { StyledBox, StyledBoxTop, StyledPaper } from './UserCarsDataStyles'
import { Divider, Grid, Stack, Typography } from '@mui/material'
import UserCarList from './UserCarList/UserCarList'

interface IUserCarsData {
  userId: string | undefined
}

const schema = yup.object().shape({
  fullNameOwner: yup.string().min(3),
  model: yup.string().min(4).required('Write model, min 4 characters'),
  year: yup.string().min(4).required('Write year of the car, it must me greater than 1960'),
  capaciteEngine: yup.string().min(2).required('Write capicicty engine'),
  regVihicleNumber: yup.string().min(4).required('Vehicle humber must contain at least 4 number'),
  technicalPassNumber: yup.string().min(4).required('Tech pass must contain at least 4 number'),
  viaNumber: yup.string().min(5).required('Vin number must contain at least 4 number'),
  driveTrain: yup.string().min(4).required('Drive train must contain at least 4 number'),
})

const UserCarsData: FC<IUserCarsData> = ({ userId }) => {
  const users = useSelector((state: RootState) => state.users.users)
  const theUser = users.find(user => {
    return user.id == userId
  })
  const cars = theUser?.cars

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const onSubmitHandler = useCallback((data: any) => {
    console.log(data)
  }, [])

  return (
    <StyledPaper>
      <Stack direction="column" sx={{ margin: 'auto' }}>
        <StyledBoxTop>
          <Typography variant="h6">Cars Info</Typography>
          <Divider />
        </StyledBoxTop>
        <StyledBox>
          <Grid container spacing={3}>
            <Grid item xs={6} md={4}>
                <UserCarList cars={cars}/>
            </Grid>
            <Grid item xs={6} md={8}></Grid>
          </Grid>
        </StyledBox>
      </Stack>
    </StyledPaper>
  )
}

export default UserCarsData
