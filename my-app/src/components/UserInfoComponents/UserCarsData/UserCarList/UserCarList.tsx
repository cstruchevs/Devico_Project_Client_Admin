import { Box, Paper, Stack, Typography } from '@mui/material'
import { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { uiActions } from '../../../../store/ui-slice'
import { ICar } from '../../../../store/users'

interface IUserCarList {
  cars: ICar[] | undefined
}

const UserCarList: FC<IUserCarList> = ({ cars }) => {
  const dispatch = useDispatch()
  const carId = useSelector((state: RootState) => state.ui.indexCar)

  const selectedCarBorder = '2px solid black'
  const setCarId = useCallback(
    (index: string) => {
      dispatch(uiActions.setCarId({ index }))
    },
    [dispatch],
  )
  return (
    <Stack direction="column">
      {cars?.map((car, index) => {
        return (
          <Paper
            elevation={2}
            sx={{
              padding: '15px',
              margin: '20px 0',
              width: '100%',
              border: car.id == carId ? selectedCarBorder : '',
            }}
            onClick={() => {
              setCarId(car?.id)
            }}
          >
            <Typography>{car.model}</Typography>
            <Typography>{car.year}</Typography>
          </Paper>
        )
      })}
    </Stack>
  )
}

export default UserCarList
