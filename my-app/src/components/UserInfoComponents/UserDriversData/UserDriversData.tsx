import { Button, Divider, MenuItem, Stack, Typography } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import {
  StyledBox,
  StyledBoxBottom,
  StyledBoxTop,
  StyledPaper,
  StyledTextField,
  StyledTypography,
} from './UserDriversDataStyles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InpurtErrorHandler from '../../InputErrorsHandler'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'

interface IUserDriversData {
  userId: string | undefined
}

const schema = yup.object().shape({
  representiveFullName: yup.string().min(8).required('Write min 8 characters'),
  nickname: yup.string().min(6).required('Write min 6 characters'),
  representiveLicense: yup.number().min(5).required('Write min 5 numbers'),
  city: yup.string().nullable(true),
  sportDriverLicense: yup.string().min(5).required('Write min 5 numbers'),
  regAdress: yup.string().min(5).nullable(true),
  driverLicense: yup.string().min(8).required('Write min 8 numbers'),
  idNumber: yup.string().min(8).required('Write min 8 numbers'),
  phone: yup.string().min(10).required('Write min 10 numbers'),
  dob: yup.date().required('Date is required'),
})

const UserDriversData: FC<IUserDriversData> = ({ userId }) => {
  const dispatch = useDispatch()

  const users = useSelector((state: RootState) => state.users.users)
  const theUser = users.filter(user => {
    return user.id !== userId
  })
  console.log(users)
  const driversData = theUser[0]?.driversData
  const [driversDataInputs, setDriversDataInputs] = useState(driversData)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDriversDataInputs({
      ...driversDataInputs,
      [e.target.name]: value,
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const onSubmitHandler = useCallback((data: any) => {
    console.log(data)
  }, [])

  return (
    <StyledPaper>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack direction="column" sx={{ margin: 'auto' }}>
          <StyledBoxTop>
            <Typography variant="h6">Drivers Data Info</Typography>
          </StyledBoxTop>
          <Divider />
          <Stack direction="row">
            <StyledBox>
              <StyledTypography>FULL NAME(NICKNAME)*</StyledTypography>
              <StyledTextField
                {...register('nickname')}
                name="nickname"
                type="text"
                value={driversDataInputs?.nickname}
                onChange={handleChangeInput}
                error={Boolean(errors.nickname)}
                InputProps={
                  errors.nickname && {
                    endAdornment: <InpurtErrorHandler errors={errors.nickname} />,
                  }
                }
              />
              <StyledTypography>DOB*</StyledTypography>
              <StyledTextField
                {...register('dob')}
                name="dob"
                type="date"
                value={driversDataInputs?.dob}
                onChange={handleChangeInput}
                error={Boolean(errors.dob)}
                InputProps={
                  errors.dob && {
                    endAdornment: <InpurtErrorHandler errors={errors.dob} />,
                  }
                }
              />
              <StyledTypography noWrap={true}>DRIVER LICENSE NUMBER*</StyledTypography>
              <StyledTextField
                {...register('driverLicense')}
                name="driverLicense"
                type="text"
                value={driversDataInputs?.driverLicense}
                onChange={handleChangeInput}
                error={Boolean(errors.driverLicense)}
                InputProps={
                  errors.driverLicense && {
                    endAdornment: <InpurtErrorHandler errors={errors.driverLicense} />,
                  }
                }
              />
              <StyledTypography>CELL NUMBER*</StyledTypography>
              <StyledTextField
                {...register('phone')}
                name="phone"
                type="text"
                value={driversDataInputs?.phone}
                onChange={handleChangeInput}
                error={Boolean(errors.phone)}
                InputProps={
                  errors.phone && {
                    endAdornment: <InpurtErrorHandler errors={errors.phone} />,
                  }
                }
              />
              <StyledTypography>ID NUMBER</StyledTypography>
              <StyledTextField
                {...register('idNumber')}
                name="idNumber"
                type="text"
                value={driversDataInputs?.idNumber}
                onChange={handleChangeInput}
                error={Boolean(errors.idNumber)}
                InputProps={
                  errors.idNumber && {
                    endAdornment: <InpurtErrorHandler errors={errors.idNumber} />,
                  }
                }
              />
            </StyledBox>
            <StyledBox>
              <StyledTypography>CITY</StyledTypography>
              {/* <StyledSelectField
                value={city ? city : driversDataInputs.city}
                {...register('city')}
                onChange={handleChange}
                name="city"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={Boolean(errors.city)}
              >
                <MenuItem value={'Kharkiv'}>Kharkiv</MenuItem>
                <MenuItem value={'Kiev'}>Kiev</MenuItem>
                <MenuItem value={'Melitopol'}>Melitopol</MenuItem>
              </StyledSelectField> */}
              <StyledTypography>REG ADRESS*</StyledTypography>
              <StyledTextField
                {...register('regAdress')}
                name="regAdress"
                type="text"
                value={driversDataInputs?.regAdress}
                onChange={handleChangeInput}
                error={Boolean(errors.regAdress)}
                InputProps={
                  errors.regAdress && {
                    endAdornment: <InpurtErrorHandler errors={errors.regAdress} />,
                  }
                }
              />
              <StyledTypography noWrap={true}>FULL NAME OF YOUR REPRESENTATIVE</StyledTypography>
              <StyledTextField
                {...register('representiveFullName')}
                name="representiveFullName"
                type="text"
                value={driversDataInputs?.representiveFullName}
                onChange={handleChangeInput}
                error={Boolean(errors.representiveFullName)}
                InputProps={
                  errors.representiveFullName && {
                    endAdornment: <InpurtErrorHandler errors={errors.representiveFullName} />,
                  }
                }
              />
              <StyledTypography>REPRESENTAIVE LICENSE NUMBER</StyledTypography>
              <StyledTextField
                {...register('representiveLicense')}
                name="representiveLicense"
                type="text"
                value={driversDataInputs?.representiveLicense}
                onChange={handleChangeInput}
                error={Boolean(errors.representiveLicense)}
                InputProps={
                  errors.representiveLicense && {
                    endAdornment: <InpurtErrorHandler errors={errors.representiveLicense} />,
                  }
                }
              />
              <StyledTypography>SPORT DRIVER LICENSE NUMBER</StyledTypography>
              <StyledTextField
                {...register('sportDriverLicense')}
                name="sportDriverLicense"
                type="text"
                value={driversDataInputs?.sportDriverLicense}
                onChange={handleChangeInput}
                error={Boolean(errors.sportDriverLicense)}
                InputProps={
                  errors.sportDriverLicense && {
                    endAdornment: <InpurtErrorHandler errors={errors.sportDriverLicense} />,
                  }
                }
              />
            </StyledBox>
          </Stack>
          <StyledBoxBottom>
            <Button type="submit">Save</Button>
          </StyledBoxBottom>
        </Stack>
      </form>
    </StyledPaper>
  )
}

export default UserDriversData
