import { Dialog, DialogActions, DialogContent, Stack } from '@mui/material'
import { FC, useCallback } from 'react'
import InpurtErrorHandler from '../../InputErrorsHandler'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  StyledButton,
  StyledDialogActionsBox,
  StyledDialogTitle,
  StyledTextField,
  StyledTypography,
} from '../LoginFormStyles'
import { RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../../store/ui-slice'
import { useNavigate } from 'react-router-dom'
import {sagaActions} from '../../../store/sagaActions'

interface ILoginCodeVerify {}

const schema = yup.object().shape({
  code: yup.string().min(4).required('Write correct verification code'),
})

const LoginCodeVerify: FC<ILoginCodeVerify> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isShowFormVerification = useSelector<RootState, boolean>(state => state.ui.showCodeVerify)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const onSubmitHandler = useCallback((data: any) => {
    dispatch({
        type: sagaActions.TWO_FACTOR_VERIFY,
        payload: { ...data }
      })
    dispatch(uiActions.toggleCodeVerify())
    navigate('/users', { replace: true })
  }, [dispatch])

  return (
    <Dialog open={isShowFormVerification}>
      <StyledDialogTitle>Sign In</StyledDialogTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <DialogContent>
          <Stack direction="column" sx={{ margin: 'auto' }}>
            <StyledTypography>GOOGLE AUTHENTICATOR CODE*</StyledTypography>
            <StyledTextField
              {...register('code')}
              name="code"
              error={Boolean(errors.code)}
              InputProps={
                errors.code && {
                  endAdornment: <InpurtErrorHandler errors={errors.code} />,
                }
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <StyledDialogActionsBox>
            <StyledButton type="submit">Check Code</StyledButton>
          </StyledDialogActionsBox>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default LoginCodeVerify
