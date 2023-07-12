import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CustomText from '../../../components/common/CustomText';
import { TablePagination } from '@material-ui/core';
import ButtonComponent from '../../../components/common/ButtonComponent';
import ModalUi from '../../../components/common/Modal';
import EnhancedTable from '../../../components/common/DataTable';
import { headCells } from '../static-data';
import popUpIcon from '../../../assets/popup.png';
import { useHistory } from 'react-router-dom';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  button: {
    marginLeft: '30px',
  },
});

const Row = (props) => {
  const history = useHistory();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [show, setShow] = React.useState(false);
  const checkboxValue = [];
  const [selectedData, setSelectedData] = React.useState();
  const [rows, setRows] = React.useState([]);
  const showDetails = (value, data) => {
    setShow(true);
    props.showDetails(value, data);
    setSelectedData(data);
  };

  const onNo = () => {
    setShow(false);
  };

  const deleteRow = (id) => {
    setShow(false);
    props.deleteRow(id, selectedData);
  };

  const onAddPackages = () => {
    history.push('/availablePackage');
  };

  const expand = () => {
    setOpen(!open);
    props.onClick(row, !open);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              expand(row, open);
              // setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.sNo}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.partnerId}
        </TableCell>
        <TableCell>{row.partnerName}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell component="th" scope="row">
          {row.status}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Box display="flex" flexDirection="row">
                <CustomText color="black" fontSize="22px" fontWeight={200}>
                  Package Details
                </CustomText>
                {/* <ButtonComponent
                  className={classes.button}
                  backgroundColor={'white'}
                  onClick={onAddPackages}
                  labelColor={'#0898be'}
                  height={'40.1px'}
                  // width={'108.4px'}
                  fontSize={'18px'}
                  hoverColor={'white'}
                >
                  Add more Packages
                </ButtonComponent> */}
              </Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Subscribed Packages</b>
                    </TableCell>
                    <TableCell>
                      <b>status</b>
                    </TableCell>
                    <TableCell>
                      <b>API details</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.packages.map((row) => (
                    <TableRow key={row.services}>
                      <TableCell component="th" scope="row">
                        {row.packages}
                      </TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <ButtonComponent
                          onClick={(data) => showDetails(row.services, row)}
                        >
                          <img
                            style={{ width: '20px', height: '20px' }}
                            src={popUpIcon}
                            alt={popUpIcon}
                          />
                        </ButtonComponent>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {show ? (
        <ModalUi
          title={'Package Details'}
          isOpen={show}
          secondaryText="No"
          onClose={onNo}
        >
          {props.services.length < 1 ? (
            <CustomText color="#0898be" fontSize="15px">
              No Services are present
            </CustomText>
          ) : (
            <EnhancedTable
              paginationValue={10}
              checkBoxValue={checkboxValue}
              flag={false}
              headCells={headCells}
              rows={props.services}
              deleteFlag={true}
              deleteFunc={(val) => deleteRow(val)}
              // eslint-disable-next-line no-console
              onClick={(val) => console.log('checkboxValue', val)}
            />
          )}
        </ModalUi>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    email: PropTypes.number.isRequired,
    location: PropTypes.number.isRequired,
    sNo: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const CollapsibleTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {props.header.map((item) => (
                <TableCell>
                  <b>{item}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...props.rows]
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row
                  key={row.name}
                  row={row}
                  onClick={props.onClick}
                  packages={props.packages}
                  deleteRow={props.deleteRow}
                  showDetails={props.showDetails}
                  services={props.services}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 4, 5]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CollapsibleTable;
