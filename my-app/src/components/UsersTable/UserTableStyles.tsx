import styled from '@emotion/styled'
import { Stack, Typography } from '@mui/material'

export const TopNavUsers = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const TopNavRight = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const TopNavIconStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 15,
  fontSize: '0.5em',
  ':hover': {
    cursor: 'pointer',
  },
})

export const TopNavIconStackTypogrphy = styled(Typography)({
  marginLeft: '5px',
  fontSize: '1.8em',
})

export const TypygoraphyDetails = styled(Typography)({
  textDecoration: 'underline',
  color: '#3581F7',
  ':hover': {
    cursor: 'pointer'
  }
})

