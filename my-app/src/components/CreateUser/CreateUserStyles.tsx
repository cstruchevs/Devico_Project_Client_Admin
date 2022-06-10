import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'

export const StyledDialogTitle = styled(DialogTitle)({
  margin: 'auto',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '30px',
})

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

export const StyledStackDescription = styled(Stack)({
  marginTop: '15px',
  paddingLeft: '10px',
  alignItems: 'center',
  minWidth: '300px',
  justifyContent: 'space-between',
  paddingBottom: '4px',
  flexDirection: 'row',
  dislpay: 'baseline',
})

export const StyledStackDescriptionElement = styled(Stack)({
  alignItems: 'center',
  dislpay: 'baseline',
})

export const StyledTypographyHandler = styled(Typography)({
  fontSize: '16px',
  display: 'inline',
  textDecoration: 'underline',
  '&:hover': {
    cursor: 'pointer',
  },
})

export const StyledButton = styled(Button)({
  fontSize: '16px',
  display: 'inline',
  width: '80%',
  '&:hover': {
    cursor: 'pointer',
  },
})

export const ConfirmStyledButton = styled(Button)({
  margin: 'auto',
  width: '100px',
  color: 'black',
  height: '33px',
  borderRadius: '0px',
  border: '1px solid black',
  fontSize: '13px',
  '&:hover': {
    color: 'black',
    border: '1px solid black',
  },
  '&:disabled': {
    color: '#d7d2d2',
  },
})

export const StyledDialogActionsBox = styled(Box)({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
})
