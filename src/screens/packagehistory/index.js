import { React, Component } from 'react';
import { styled } from '@material-ui/core/styles';
import loginimage from '../../assets/background.png';
import MainScreen from '../../components/common/MainScreen';
import { connect } from 'react-redux';
import { Box, Container, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import CustomText from '../../components/common/CustomText';
import CustomPlanCard from '../../components/common/PackageCard/customPlan-card';
import { headCells, PackageList, parnterPackageList } from './static-data';
import {
  getAllPurchasedPackages,
  setAllPackages,
} from '../../redux/actions/getAllPurchasedpackages';
import {
  getAllPackages,
  setPackages,
} from '../../redux/actions/getAllPackagesDetails';
import ButtonComponent from '../../components/common/ButtonComponent';
import SnackBarComponent from '../../components/common/SnackBarComponent';
import ModalUi from '../../components/common/Modal';
import DropDownComponent from '../../components/common/DropdownComponent';
import EnhancedTable from '../../components/common/DataTable';
const SubWrapper = styled('div')({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-between',
  backgroundImage: `url(${loginimage})`,
});
const CardDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});
const useStyles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  title: {
    marginTop: '30px',
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    marginBottom: '20px',
  },
});
class PurchasedHistory extends Component {
  state = {
    apiFlag: true,
    openFlag: false,
    packageErrorFlag: false,
    packageValue: '',
    apiAllPackFlag: true,
    packagesList: [],
    rows: [],
    packages: [],
    checkboxValue: [],
    services: [],
  };
  componentDidMount() {
    // this.props.getAllPurchasedPackages();
  }
  onClick = (id, name) => {
    if (id && name === 'Available Packages') {
      this.props.history.push('availablePackage');
    }

    // else if (id && name === 'Manage Packages') {
    //   this.setState({ openFlag: true });
    //   this.props.getAllPurchasedPackages(
    //     true,
    //     localStorage.getItem('partner_id'),
    //   );
    // }
    else {
      this.props.getAllPurchasedPackages(
        true,
        localStorage.getItem('partner_id'),
      );
    }
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
    this.setState({ messageRegister: '' });
    if (localStorage.getItem('clientStatus')) {
      this.props.history.push('/availablePackage');
    } else {
      this.props.history.push('/home');
    }
  };
  onClickLogoutButton = () => {
    this.props.history.push('/login');
  };
  getAllPurchasedPackagesDetails = () => {
    let tempArray = [];
    let finalArray;
    if (this.props.getAllPurchasedPackagesInfo !== undefined) {
      if (this.props.getAllPurchasedPackagesInfo.data !== undefined) {
        if (this.state.apiFlag) {
          this.setState({ apiFlag: false });
          if (this.props.getAllPurchasedPackagesInfo.status === 200) {
            if (this.state.openFlag) {
              this.setState({
                packages: this.props.getAllPurchasedPackagesInfo.data,
              });
              this.props.getAllPurchasedPackagesInfo.data.map((data1) => {
                tempArray.push({
                  label: data1.packageName,
                  value: data1.packageId,
                });
                return null;
              });
              finalArray = tempArray.filter(
                (ele, ind) =>
                  ind ===
                  tempArray.findIndex(
                    (elem) =>
                      elem.label === ele.label && elem.value === ele.value,
                  ),
              );
              this.setState({ packagesList: finalArray });
            } else {
              this.props.history.push('/purchasedPackage');
            }
          } else {
            this.setState({ open: true });
            this.setState({
              messageRegister: 'Not Purchased any packages',
            });
          }
        }
        this.props.setAllPackages();
      }
    }
  };
  home = () => {
    this.props.history.push('./home');
  };
  onCancel = () => {
    this.setState({ openFlag: false });
    this.setState({ packageValue: '' });
    this.setState({ rows: [] });
  };
  onDropdownChange = (e) => {
    this.setState({ packageErrorFlag: false });
    this.setState({ packageValue: e.target.value });
    this.getPackageDataByID(e.target.value);
  };
  getPackageDataByID = (id) => {
    let tempArray = [];
    let tempObj;
    let tempArr = [];
    let servicesData = [];
    this.state.packages.map((item) => {
      if (item.packageId === id && item.status === 'active') {
        this.setState({
          packageId: item.packageId,
          services: item.services,
        });
        servicesData = item.services;
      }
      return null;
    });
    this.setState({ services: servicesData });
    servicesData.map((data) => {
      tempObj = {
        name: data.serviceId,
        module: data.moduleName,
        service: data.serviceName,
        version: data.version,
        requestCount: data.requestsCount,
        requestsUtilized: data.requestsUtilized,
        status: data.status,
      };
      if (data.status === 'active') {
        tempArr.push(data.serviceId);
      }
      tempArray.push(tempObj);
      this.setState({ rows: tempArray });
      return null;
    });
    this.setState({ checkboxValue: tempArr });
  };
  checkboxOnchange = (val) => {
    let temparray = [];
    val &&
      val.map((data) => {
        temparray.push(data);
        return null;
      });
    // this.setState({ apiIdListError: false });
    this.setState({ checkboxValue: temparray });
    if (this.state.editFlag) {
      this.setState({ editCheck: true });
    }
  };
  onUpdate = () => {
    let servicesData = [];
    let arr1 = [...this.state.services];
    let arr2 = this.state.checkboxValue;
    arr1.map((o1) => {
      if (
        !this.state.checkboxValue.includes(o1.serviceId) &&
        o1.status === 'active'
      ) {
        o1.status = 'inactive';
      }
      if (
        this.state.checkboxValue.includes(o1.serviceId) &&
        o1.status === 'inactive'
      ) {
        o1.status = ' active';
      }
    });
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
            >
              <CustomText
                color="#ffff"
                fontSize="30px"
                fontWeight={200}
                className={classes.title}
              >
                Package
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
            <CardDiv>
              {localStorage.getItem('clientStatus')
                ? PackageList.map((data, idx) => (
                    <CustomPlanCard
                      select={''}
                      label={data.moduleName}
                      onClick={() =>
                        this.onClick(data.moduleId, data.moduleName)
                      }
                      key={idx.toString()}
                      imgFlag={false}
                      localImg={data.moduleIcon}
                    />
                  ))
                : parnterPackageList.map((data, idx) => (
                    <CustomPlanCard
                      select={''}
                      label={data.moduleName}
                      onClick={() =>
                        this.onClick(data.moduleId, data.moduleName)
                      }
                      key={idx.toString()}
                      imgFlag={false}
                      localImg={data.moduleIcon}
                    />
                  ))}
            </CardDiv>
            {/* <ModalUi
              title={'Package Management'}
              isOpen={this.state.openFlag}
              secondaryText="No"
              onClose={(event) => this.onCancel(event)}
              onPrimaryClick={(e, _flag) => this.onUpdate(e)}
              primaryText="Update"
            >
              <DropDownComponent
                width="250px"
                error={this.state.packageErrorFlag}
                helperText="Choose Package"
                label="Available Packages"
                backgroundColor="1.5px solid #0279a8"
                iconColor="#0279a8"
                labelColor="#4b485e"
                dropdownOption={this.state.packagesList}
                onChange={this.onDropdownChange}
                value={this.state.packageValue}
                className={classes.text}
              />
              {this.state.packageValue !== '' ? (
                <EnhancedTable
                  headCells={headCells}
                  rows={this.state.rows}
                  edit={true}
                  flag={true}
                  checkBoxValue={this.state.checkboxValue}
                  // eslint-disable-next-line no-console
                  onClick={(val) => this.checkboxOnchange(val)}
                />
              ) : (
                ''
              )}
            </ModalUi> */}
          </Container>
        </SubWrapper>
        {this.state.open ? (
          <SnackBarComponent
            open={this.state.open}
            onClose={this.handleClose}
            message={this.state.messageRegister}
            iconclose={this.handleClose}
          />
        ) : (
          ''
        )}
        {this.props.getAllPurchasedPackagesInfo &&
        this.props.getAllPurchasedPackagesInfo
          ? this.getAllPurchasedPackagesDetails()
          : ''}
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getAllPurchasedPackagesInfo: state.getAllPurchasedPackages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPurchasedPackages: (x, y) => dispatch(getAllPurchasedPackages(x, y)),
    setAllPackages: () => dispatch(setAllPackages()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(PurchasedHistory);
