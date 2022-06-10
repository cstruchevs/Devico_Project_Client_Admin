import { Button, Dialog, DialogActions, DialogContent, Divider, Stack } from '@mui/material'
import { FC, memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  ConfirmStyledButton,
  StyledButton,
  StyledDialogActionsBox,
  StyledDialogTitle,
  StyledTextField,
  StyledTypography,
} from './CreateUserStyles'
import InpurtErrorHandler from '../InputErrorsHandler'
import { RootState } from '../../store'
import { uiActions } from '../../store/ui-slice'
import { sagaActions } from '../../store/sagaActions'

interface ICreateUser {}

const schema = yup.object().shape({
  email: yup.string().email().required('Write correct email'),
  password: yup
    .string()
    .min(8)
    .max(32)
    .required('Write correct password, length 8 to 32 characters'),
  phone: yup.string().min(10).max(14),
  fullName: yup.string().min(5).max(32),
})

const CreateUser: FC<ICreateUser> = () => {
  const dispatch = useDispatch()

  const isShowCreateUser = useSelector<RootState, boolean>(state => state.ui.showCreateUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const toggleCreateUser = useCallback(() => {
    reset()
    dispatch(uiActions.toggleCreateUser())
  }, [dispatch, reset])

  const onSubmitHandler = (data: any) => {
    dispatch({ type: sagaActions.ADD_USER, payload: { ...data } })
    toggleCreateUser()
  }

  return (
    <Dialog open={isShowCreateUser} onClose={toggleCreateUser}>
      <StyledDialogTitle>Create User</StyledDialogTitle>
      <Divider />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <DialogContent>
          <Stack direction="column" sx={{ margin: 'auto', width: '80%' }}>
            <StyledTypography>FULL NAME*</StyledTypography>
            <StyledTextField
              {...register('fullName')}
              name="fullName"
              error={Boolean(errors.fullName)}
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
              InputProps={
                errors.phone && {
                  endAdornment: <InpurtErrorHandler errors={errors.phone} />,
                }
              }
            />
            <StyledTypography>PASSWORD*</StyledTypography>
            <StyledTextField
              {...register('password')}
              name="password"
              type="password"
              error={Boolean(errors.password)}
              InputProps={
                errors.password && {
                  endAdornment: <InpurtErrorHandler errors={errors.password} />,
                }
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions disableSpacing={true}>
          <Button onClick={toggleCreateUser} sx={{ marginLeft: 'auto' }}>
            Cancel
          </Button>
          <ConfirmStyledButton type="submit">Create User</ConfirmStyledButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default memo(CreateUser)
