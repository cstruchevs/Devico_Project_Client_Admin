import {
  Button,
  Checkbox,
  IconButton,
  Stack,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { Box } from '@mui/system'
import { visuallyHidden } from '@mui/utils'
import { Data, Order } from '../UserTableTypes'
import headCells from './HeadCellsData'
import DeleteIcon from '@mui/icons-material/Delete'
import { TableHeadStack } from './EnhancedTableHeadStyles'

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  const HeadCells = headCells.map(headCell => (
    <TableCell
      key={headCell.id}
      align={headCell.numeric ? 'right' : 'left'}
      padding={headCell.disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === headCell.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : 'asc'}
        onClick={createSortHandler(headCell.id)}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  ))

  const SelectedHeadCells = (
      <TableCell key="selected" align="left" padding="normal">
        <TableHeadStack direction="row">
          {numSelected} selected
          <IconButton>
            <DeleteIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </TableHeadStack>
      </TableCell>
  )
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {numSelected > 0 ? SelectedHeadCells : HeadCells}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
