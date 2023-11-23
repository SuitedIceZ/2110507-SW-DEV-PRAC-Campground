'use client'
// import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { IconButton, InputAdornment, TextFieldProps } from '@mui/material'
import { useShowPassword } from '@/hooks/useShowPassword'
import { FC } from 'react'

// import TextField from './TextField'

import { TextField as TextFieldMUI, styled } from '@mui/material'
const StyledTextField = styled(TextFieldMUI)`
  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px white inset !important;
      border-radius: 12px;
  }
  label.Mui-focused {
    color: #000000;
  }
  border: none;
`

const PasswordTextField: FC<TextFieldProps> = (props) => {
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } =
    useShowPassword()

  return (
    <StyledTextField
      fullWidth
      variant="filled"
      type={!showPassword ? 'password' : 'text'}
      style={{
        backgroundColor: 'white',
        borderRadius: '4px',
      }}
      size="small"
      {...props}
      InputProps={{
        disableUnderline: true,
        sx: {
          borderRadius: '4px',
          backgroundColor: '#21212114',
          '& ::-ms-reveal': {
            display: 'none',
          },
          '& ::-ms-clear': {
            display: 'none',
          },
          ...props.InputProps?.sx,
        },
        endAdornment: (
            <InputAdornment position="end">
              <IconButton
                tabIndex={-1}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                style={{ color: "#616161" }}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        ...props.InputProps,
      }}
      InputLabelProps={{
        sx: {
          color: '#666666',
          ...props.InputLabelProps?.sx,
        },
        ...props.InputLabelProps,
      }}
    />
  )
}

export default PasswordTextField