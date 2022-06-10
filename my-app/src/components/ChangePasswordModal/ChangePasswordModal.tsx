import { Dialog, DialogActions, DialogContent, Divider, Stack } from '@mui/material'
import { FC, useCallback } from 'react'
import InpurtErrorHandler from '../InputErrorsHandler'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  StyledButton,
  StyledDialogActionsBox,
  StyledDialogTitle,
  StyledTextField,
  StyledTypography,
} from './ChangePasswordModalStyles'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui-slice'

interface IChangePassword {}

const schema = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const ChangePassword: FC<IChangePassword> = () => {
  const dispatch = useDispatch()
  const isShowChangePass = useSelector<RootState, boolean>(state => state.ui.showChangePass)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const toggleChangePass = useCallback(() => {
    dispatch(uiActions.toggleChangePass())
  }, [dispatch])

  const onSubmitHandler = useCallback(
    (data: any) => {
      console.log(data)
      dispatch(uiActions.toggleChangePass())
      reset()
    },
    [dispatch, reset],
  )

  return (
    <Dialog open={isShowChangePass} onClose={toggleChangePass}>
      <StyledDialogTitle>Change Password</StyledDialogTitle>
      <Divider />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <DialogContent>
          <Stack direction="column" sx={{ margin: 'auto' }}>
            <StyledTypography>NEW PASSWORD*</StyledTypography>
            <StyledTextField
              {...register('password')}
              name="password"
              error={Boolean(errors.password)}
              InputProps={
                errors.LoginCodeVerify && {
                  endAdornment: <InpurtErrorHandler errors={errors.password} />,
                }
              }
            />
            <StyledTypography>CONFIRM PASSWORD*</StyledTypography>
            <StyledTextField
              {...register('confirmPassword')}
              name="confirmPassword"
              type="password"
              error={Boolean(errors.confirmPassword)}
              InputProps={
                errors.confirmPassword && {
                  endAdornment: <InpurtErrorHandler errors={errors.LoginCodeVerify} />,
                }
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <StyledDialogActionsBox>
            <StyledButton type="submit">Reset</StyledButton>
          </StyledDialogActionsBox>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ChangePassword
