import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { FC, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import InpurtErrorHandler from '../InputErrorsHandler'
import {
  StyledButton,
  StyledDialogActionsBox,
  StyledDialogTitle,
  StyledStackDescription,
  StyledStackDescriptionElement,
  StyledTextField,
  StyledTypography,
  StyledTypographyHandler,
} from './LoginFormStyles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {sagaActions} from '../../store/sagaActions'
import * as yup from 'yup'

interface ILoginForm {}

const schema = yup.object().shape({
  email: yup.string().email().required('Write correct email'),
  password: yup.string().min(8).max(32).required('Write correct password'),
})

const LoginForm: FC<ILoginForm> = () => {
  const dispatch = useDispatch()
  const [isShow, setIsShow] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const [checked, setChecked] = useState(true)

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(prevState => !prevState)
  }

  const onSubmitHandler = useCallback((data: any) => {
    dispatch({
      type: sagaActions.TWO_FACTOR_AUTH,
      payload: { ...data }
    })
    setIsShow(false)
  }, [dispatch])

  return (
    <Dialog open={isShow}>
      <StyledDialogTitle>Sign In</StyledDialogTitle>
      <Divider />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <DialogContent>
          <Stack direction="column" sx={{ margin: 'auto' }}>
            <StyledTypography>EMAIL*</StyledTypography>
            <StyledTextField
              {...register('email')}
              name="email"
              type="email"
              error={Boolean(errors.email)}
              InputProps={
                errors.email && {
                  endAdornment: <InpurtErrorHandler errors={errors.email} />,
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
          <StyledStackDescription direction="row">
            <StyledStackDescriptionElement direction="row">
              <Checkbox
                checked={checked}
                onChange={handleChangeCheckBox}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{ padding: '0' }}
              />
              <Typography sx={{ fontSize: '14px' }}>Remember me</Typography>{' '}
            </StyledStackDescriptionElement>
            <StyledTypographyHandler>Forgot password?</StyledTypographyHandler>
          </StyledStackDescription>
        </DialogContent>
        <DialogActions>
          <StyledDialogActionsBox>
            <StyledButton type="submit">Subscribe</StyledButton>
          </StyledDialogActionsBox>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default LoginForm
