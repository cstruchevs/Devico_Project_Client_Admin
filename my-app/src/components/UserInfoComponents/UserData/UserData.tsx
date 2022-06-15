import { Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import {
  StyledBox,
  StyledBoxBottom,
  StyledBoxTop,
  StyledPaper,
  StyledTextField,
  StyledTypography,
} from './UserDataStyles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InpurtErrorHandler from '../../InputErrorsHandler'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

interface IUserDataInterface {
  userId: string | undefined
}

const schema = yup.object().shape(
  {
    fullName: yup.string().when('fullName', {
      is: (fullName: string) => fullName?.length > 0,
      then: yup.string().min(8, 'fullName must be at least 3 characters'),
    }),
    email: yup.string().email().required('Write correct email'),
    password: yup.string().when('password', {
      is: (password: string) => password?.length > 0,
      then: yup.string().min(8, 'Password must be at least 8 characters'),
    }),
    phone: yup.string().when('phone', {
      is: (phone: string) => phone?.length > 0,
      then: yup.string().min(10, 'Phone must be at least 10 characters'),
    }),
  },
  [
    ['fullName', 'fullName'],
    ['password', 'password'],
    ['phone', 'phone'],
  ],
)

const UserData: FC<IUserDataInterface> = ({ userId }) => {
  const users = useSelector((state: RootState) => state.users.users)
  const theUser = users.filter(user => {
    return user.id !== userId
  })

  const [user, setUser] = useState(theUser[0])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUser({
      ...user,
      [e.target.name]: value,
    })
  }

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
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack direction="column" sx={{ margin: 'auto' }}>
          <StyledBoxTop>
            <Typography variant="h6">User Info</Typography>
          </StyledBoxTop>
          <Divider />
          <StyledBox>
            <StyledTypography>FULL NAME*</StyledTypography>
            <StyledTextField
              {...register('fullName')}
              name="fullName"
              error={Boolean(errors.fullName)}
              value={user?.fullName}
              onChange={handleChangeInput}
              InputProps={
                errors.fullName && {
                  endAdornment: <InpurtErrorHandler errors={errors.fullName} />,
                }
              }
            />
            <StyledTypography>EMAIL*</StyledTypography>
            <StyledTextField
              {...register('email')}
              name="email"
              error={Boolean(errors.email)}
              value={user?.email}
              onChange={handleChangeInput}
              InputProps={
                errors.email && {
                  endAdornment: <InpurtErrorHandler errors={errors.email} />,
                }
              }
            />
            <StyledTypography>PHONE*</StyledTypography>
            <StyledTextField
              {...register('phone')}
              name="phone"
              error={Boolean(errors.phone)}
              value={user?.phone}
              onChange={handleChangeInput}
              InputProps={
                errors.phone && {
                  endAdornment: <InpurtErrorHandler errors={errors.phone} />,
                }
              }
            />
            <StyledTypography>NEW PASSWORD*</StyledTypography>
            <StyledTextField
              {...register('password')}
              name="password"
              type="password"
              error={Boolean(errors.password)}
              onChange={handleChangeInput}
              InputProps={
                errors.password && {
                  endAdornment: <InpurtErrorHandler errors={errors.password} />,
                }
              }
            />
          </StyledBox>
          <StyledBoxBottom>
            <Button type="submit">Save</Button>
          </StyledBoxBottom>
        </Stack>
      </form>
    </StyledPaper>
  )
}

export default UserData
