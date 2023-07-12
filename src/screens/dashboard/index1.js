import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

const sample = [
  { name: 'apple', detail: ['a', 'b', 'c', 'd'] },
  { name: 'banana', detail: ['a', 'b'] },
];

export default function SpanningTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Fruit</TableCell>
            <TableCell align="right">Buyers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sample
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <Fragment>
                  <TableRow>
                    <TableCell rowSpan={row.detail.length + 1}>
                      {row.name}
                    </TableCell>
                  </TableRow>
                  {row.detail.map((detail) => (
                    <TableRow>
                      <TableCell>{detail}</TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[1, 2, 100]}
        component="div"
        count={sample.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
