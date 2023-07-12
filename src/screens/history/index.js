import { withStyles, styled, Box } from '@material-ui/core';
import { React, Component } from 'react';
import loginimage from '../../assets/background.png';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAllHistory } from '../../redux/actions/getTransactionHistory';
import { Container } from '@material-ui/core';
import MainScreen from '../../components/common/MainScreen';
import ButtonComponent from '../../components/common/ButtonComponent';
import CustomText from '../../components/common/CustomText';
import EnhancedTable from '../../components/common/DataTable';
import { headCells } from './static-data';

const SubWrapper = styled('div')({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-between',
  backgroundImage: `url(${loginimage})`,
});
const useStyles = () => ({
  title: {
    marginTop: '30px',
  },
  commonStyles: {
    marginBottom: '30px',
  },
});

class History extends Component {
  state = {
    historyApi: true,
    rows: [],
    checkboxValue: [],
  };
  componentDidMount() {
    this.props.getAllHistory();
  }
  tableData = () => {
    if (this.props.getAllHistoryInfo !== undefined) {
      if (this.props.getAllHistoryInfo.status === 200) {
        if (this.state.historyApi) {
          let obj;
          let tempArr = [];
          this.setState({ historyApi: false });
          this.props.getAllHistoryInfo.data.map((data) => {
            obj = {
              id: '',
              transactionTime: data.transactionTime,
              transactionId: data.transactionId,
              packageName: data.packageName,
              paymentSource: data.paymentSource,
              amount: data.amount,
            };
            tempArr.push(obj);
            return null;
          });
          this.setState({ rows: tempArr });
        }
      }
    }
  };
  home = () => {
    this.props.history.push('./home');
  };
  render() {
    const { classes } = this.props;
    return (
      <MainScreen logoutEnable={true} label={'Logout'}>
        <SubWrapper>
          <Container>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              className={classes.commonStyles}
            >
              <CustomText
                color="#ffff"
                fontSize="30px"
                fontWeight={200}
                className={classes.title}
              >
                Transaction History
              </CustomText>
              <ButtonComponent
                boxShadow={'unset'}
                fontSize={'18px'}
                backgroundColor={'unset'}
                hoverColor={'unset'}
                onClick={this.home}
                className={classes.button}
              >
                <img
                  style={{ height: '25px', width: '25px' }}
                  src={'/static/home.png'}
                  alt={'/static/home.png'}
                />
              </ButtonComponent>
            </Box>
            <EnhancedTable
              orderValue={'desc'}
              sortBy={'transactionTime'}
              paginationValue={10}
              checkBoxValue={this.state.checkboxValue}
              flag={false}
              headCells={headCells}
              rows={this.state.rows}
              // eslint-disable-next-line no-console
              onClick={(val) => console.log('checkboxValue', val)}
            />
          </Container>
        </SubWrapper>
        {this.props.getAllHistoryInfo && this.tableData()}
      </MainScreen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAllHistoryInfo: state.getAllHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHistory: () => dispatch(getAllHistory()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(History);
