import { styled, TextField, Typography } from "@mui/material";

export const StyledTypography = styled(Typography)({
    paddingLeft: '10px',
    marginBottom: '4px',
    letterSpacing: '2px',
    lineHeight: '15px',
    fontSize: '13px',
  })

  export const StyledTextField = styled(TextField)({
    width: '100%',
    minWidth: '300px',
    padding: '4px 10px 10px 10px',
    borderRadius: '0px',
    ' fieldSet': {
      borderRadius: '0px',
    },
    ' input': {
      height: '3px',
    },
  })