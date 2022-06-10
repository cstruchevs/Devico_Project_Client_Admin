import { Stack } from '@mui/material'
import { Box, styled } from '@mui/system'

export const LogoBoxStyled = styled(Box)(({ theme }) => ({
  marginTop: 10,
  marginLeft: 15,
  width: '80px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  '&:hover': {
    cursor: 'pointer',
  },
}))

export const WrapperBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexFlow: 'column',
  flexGrow: 1,
  width: '230px',
  height: '100vh',
  backgroundColor: '#C4C4C4',
  postion: 'fixed',
  left: '0',
}))

export const TopMenuStackStyled = styled(Stack)(({ theme }) => ({
  marginTop: 20,
  display: 'flex',
  flexFlow: 'column',
}))

export const BottomMenuStackStyled = styled(Stack)(({ theme }) => ({
  marginTop: 20,
  display: 'flex',
  flexFlow: 'column',
}))
