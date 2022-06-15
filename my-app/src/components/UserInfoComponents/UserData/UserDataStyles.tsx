import styled from '@emotion/styled'
import { Box, Paper, TextField, Typography } from '@mui/material'

export const StyledTypography = styled(Typography)({
  paddingLeft: '10px',
  marginBottom: '4px',
  letterSpacing: '2px',
  lineHeight: '15px',
  fontSize: '13px',
})

export const StyledTextField = styled(TextField)({
  width: '100%',
  padding: '4px 10px 10px 10px',
  borderRadius: '0px',
  ' fieldSet': {
    borderRadius: '0px',
  },
  ' input': {
    height: '3px',
  },
})

export const StyledPaper = styled(Paper)({
  width: '100%',
  borderRadius: '3px',
  height: '490px',
})

export const StyledBox = styled(Box)({
  width: '100%',
  padding: '15px',
})

export const StyledBoxTop = styled(Box)({
  width: '100%',
  padding: '15px 15px 15px 25px',
})

export const StyledBoxBottom = styled(Box)({
    width: '100%',
    height: '100%',
    margin: 'auto',
    padding: '0px 25px 15px 15px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: ''
  })
