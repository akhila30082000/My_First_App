import React from 'react';
import PropTypes, { array, bool, number, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CustomText from '../CustomText';
import { Box } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    // minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableRow: {
    '&.MuiTableRow-root': { height: '45px' },
    '&.MuiTableRow-root.MuiTableRow-hover:hover': {
      backgroundColor: '#e0e0e0',
    },
    '&.MuiTableRow-root.Mui-selected, .MuiTableRow-root.Mui-selected:hover': {
      backgroundColor: '#09b3d2',
    },
  },
  checkbox: {
    '&.MuiIconButton-colorSecondary:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '&.MuiCheckbox-colorSecondary.Mui-checked': { color: '#0279a8' },
  },
  tablebody: {
    '& .MuiTableCell-body': {
      color: '#4b485e',
      fontFamily: 'Rubik',
    },
  },
  tableHead: {
    '& .MuiTableCell-head': {
      color: '#4b485e',
      fontFamily: 'Rubik',
    },
  },
}));
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    flag,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        {flag ? (
          <TableCell padding="checkbox">
            <Checkbox
              className={classes.checkbox}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        ) : (
          ''
        )}
        {headCells.map((headCell) => (
          <TableCell
            align="center"
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon={true}
              active={headCell.sort ? true : false}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTable = ({
  headCells,
  rows,
  onClick,
  flag,
  pagination,
  checkBoxValue,
  edit,
  cost,
  noOfApis,
  orderValue,
  sortBy,
  paginationValue,
  deleteFlag,
  deleteFunc,
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState(orderValue ? orderValue : 'asc');
  const [orderBy, setOrderBy] = React.useState(sortBy ? sortBy : 'name');
  const [selected, setSelected] = React.useState(checkBoxValue, checkBoxValue);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    paginationValue ? paginationValue : 5,
  );
  const [editFlag, setEditFlag] = React.useState(edit);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    setEditFlag(false);
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => {
        return n.name;
      });
      setSelected(newSelecteds);
      onClick(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (selectedvalue, event, name) => {
    let selectedIndex;
    let newSelected = [];

    if (editFlag) {
      selectedIndex = checkBoxValue.indexOf(name);
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(checkBoxValue, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(checkBoxValue.slice(1));
      } else if (selectedIndex === checkBoxValue.length - 1) {
        newSelected = newSelected.concat(checkBoxValue.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          checkBoxValue.slice(0, selectedIndex),
          checkBoxValue.slice(selectedIndex + 1),
        );
      }
    } else {
      selectedIndex = selected.indexOf(name);
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
    }
    setSelected(newSelected);
    onClick(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteClick = (e, id) => {
    deleteFunc(id);
  };

  const isSelected = (name) => {
    if (editFlag) {
      return checkBoxValue.indexOf(name) !== -1;
    } else {
      return selected.indexOf(name) !== -1;
    }
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={editFlag ? checkBoxValue.length : selected.length}
              flag={flag}
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody className={classes.tablebody}>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  let tempArray = Object.keys(row);
                  return (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      onClick={(event) =>
                        handleClick(selected, event, row.name)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      {flag ? (
                        <TableCell padding="checkbox">
                          <Checkbox
                            className={classes.checkbox}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                      ) : (
                        ''
                      )}
                      {tempArray.map((data1) => (
                        <TableCell align="center" scope="row" padding="none">
                          {row[data1]}
                        </TableCell>
                      ))}
                      {deleteFlag ? (
                        <TableCell>
                          <DeleteOutlinedIcon
                            // style={{ marginLeft: "0px" }}
                            onClick={(event) => deleteClick(event, row.name)}
                          />
                        </TableCell>
                      ) : (
                        ''
                      )}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          ''
        )}
      </Paper>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        {cost && <CustomText color="#4b485e">Total Cost: {cost}</CustomText>}
        {noOfApis && (
          <CustomText color="#4b485e">No of Api hits: {noOfApis}</CustomText>
        )}
      </Box>
    </div>
  );
};
EnhancedTable.defaultProps = {
  flag: true,
  pagination: true,
  edit: false,
  deleteFlag: false,
};
EnhancedTable.propTypes = {
  headCells: array,
  rows: array,
  flag: bool,
  pagination: bool,
  checkBoxValue: array,
  edit: bool,
  cost: string,
  noOfApis: string,
  orderValue: string,
  sortBy: string,
  paginationValue: number,
  deleteFlag: bool,
};
export default EnhancedTable;
