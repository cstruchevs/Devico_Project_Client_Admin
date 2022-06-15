import {
  Button,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { sagaActions } from '../../store/sagaActions'
import { IUsersInterface } from '../../store/users'
import EnhancedTableHead from './EnhancedTableHead/EnhancedTableHead'
import { createData, Data, getComparator, Order } from './UserTableTypes'
import SortIcon from '@mui/icons-material/Sort'
import { TopNavIconStack, TopNavIconStackTypogrphy, TopNavUsers, TypygoraphyDetails } from './UserTableStyles'
import { uiActions } from '../../store/ui-slice'
import { useNavigate } from 'react-router-dom'

interface IUsersTable {}

const UsersTables: FC<IUsersTable> = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('name')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const userCount = useSelector<RootState, number>(state => state.users.count)
  const users = useSelector<RootState, IUsersInterface[]>(state => state.users.users)
  const rows = users.map(user => {
    return createData(user.id, user.fullName || '-', user.phone || '-', user.email, 'View Details')
  })

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.email)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    dispatch({ type: sagaActions.GET_USERS, payload: { page, limit: rowsPerPage } })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    dispatch({ type: sagaActions.GET_USERS, payload: { page, limit: rowsPerPage } })
  }

  const deleteUser = (email: string) => {
    dispatch({ type: sagaActions.DELETE_USER, payload: { email } })
  }

  const toggleCreateUser = useCallback(() => {
    dispatch(uiActions.toggleCreateUser())
  }, [dispatch])

  const toggleInviteUsers = useCallback(() => {
    dispatch(uiActions.toggleInviteUsers())
  }, [dispatch])

  const toggleUserDetails = useCallback((id:string) => {
    navigate(`/user-info/${id}`)
  }, [navigate])

  const toggleEditUser = useCallback(
    (id: string) => {
      navigate('', {
        state: {
          userId: id,
        },
      })
      dispatch(uiActions.toggleEditUser())
    },
    [dispatch, navigate],
  )

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <TopNavUsers mb={2}>
        <Button onClick={toggleInviteUsers}>Inviting User</Button>
        <Stack direction="row">
          <TopNavIconStack>
            <SortIcon sx={{ fontSize: '18px' }} />
            <TopNavIconStackTypogrphy>Sort</TopNavIconStackTypogrphy>
          </TopNavIconStack>
          <Button onClick={toggleCreateUser}>+ Create User</Button>
        </Stack>
      </TopNavUsers>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.email)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.email}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={event => handleClick(event, row.email)}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row?.name}
                      </TableCell>
                      <TableCell align="left">{row?.phone}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">
                        <TypygoraphyDetails onClick={() => {toggleUserDetails(row.id)}}>{row?.details}</TypygoraphyDetails>{' '}
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => toggleEditUser(row.id)}>Edit</Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => deleteUser(row.email)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default UsersTables
