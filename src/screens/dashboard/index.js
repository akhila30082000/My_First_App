import { Box, Container, styled, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import MainScreen from '../../components/common/MainScreen';
import loginimage from '../../assets/background.png';
import CustomText from '../../components/common/CustomText';
import CollapsibleTable from './CollapsableTable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { headerData } from './static-data';
import { getAllPartnersByClient } from '../../redux/actions/getAllPartnersByclient';
import {
  getAllPurchasedPackages,
  setAllPackages,
} from '../../redux/actions/getAllPurchasedpackages';
import ButtonComponent from '../../components/common/ButtonComponent';
import ModalUi from '../../components/common/Modal';
import { putPartnerPackage } from '../../redux/actions/putPartnerPackage';

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
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  title: {
    marginTop: '30px',
  },
  button: {
    marginTop: '20px',
  },
});
class Dashboard extends Component {
  state = {
    apiFlag: true,
    allPartners: [],
    getPackFlag: true,
    packages: [],
    show: false,
    partnerId: '',
    services: [],
    retianedServices: [],
    servicesData: [],
    packageData: [],
    packageId: '',
    packageName: '',
    deletedService: '',
    isAdmin: '',
    putApi: true,
    successMessage: '',
    confirmSuccess: false,
  };
  componentDidMount() {
    this.props.getAllPartnersByClient();
  }
  getAllPartners = () => {
    let tempArr = [];
    if (this.props.getAllPartnersByClientInfo !== undefined) {
      if (this.props.getAllPartnersByClientInfo.data !== undefined) {
        if (this.state.apiFlag) {
          this.setState({ apiFlag: false });
          this.props.getAllPartnersByClientInfo.data.partnerDetails.map(
            (data, id) => {
              tempArr.push({
                sNo: id + 1,
                partnerId: data.partnerId,
                partnerName: data.partnerName,
                email: data.emailId,
                location: data.location,
                status: data.status,
              });
              this.setState({
                allPartners: [...tempArr, ...this.state.allPartners],
              });
            },
          );
        }
      }
    }
  };

  getPartnersPackages = () => {
    let tempArray = [];
    if (this.props.getAllPurchasedPackagesInfo !== undefined) {
      if (this.props.getAllPurchasedPackagesInfo.data !== undefined) {
        if (this.state.getPackFlag) {
          this.setState({ getPackFlag: false });
          this.setState({
            packageData: this.props.getAllPurchasedPackagesInfo.data,
          });
          this.props.getAllPurchasedPackagesInfo.data.map((data) => {
            tempArray.push({
              packages: data.packageName,
              status: data.status,
              services: data.services
                .map((item) => {
                  if (item.isAccessGranted) {
                    return {
                      ...item,
                      name: item.serviceName,
                      count: item.requestsCount,
                      utilized: '',
                      remaining: '',
                      cost: item.cost,
                    };
                  }
                })
                .filter((data) => data !== undefined),
            });
            this.setState({ servicesData: data.services });
            return null;
          });
          this.setState({
            packages: [...tempArray],
          });
        }
        this.props.setAllPackages();
      }
    }
  };

  expand = (val, flag) => {
    if (flag === true) {
      this.setState({ getPackFlag: true });
      this.setState({ partnerId: val.partnerId });
      this.props.getAllPurchasedPackages(false, val.partnerId);
    } else {
      this.setState({ packages: [] });
      this.props.setAllPackages();
    }
  };

  onBoardPartner = () => {
    this.props.history.push('/onBoardPrtner');
  };

  deleteRow = (val, data) => {
    let tempServ = [];
    let tempPackage;
    this.setState({ deletedService: val });
    tempPackage = data.packages;
    this.state.packageData.map((item) => {
      if (item.packageName === tempPackage) {
        this.setState({ packageId: item.packageId });
        this.setState({ packageName: item.packageName });
        this.setState({ isAdmin: item.isAdmin });
        item.services.map((data) => {
          if (data.serviceName === val) {
            tempServ.push({
              serviceId: data.clientServiceId, //clientServiceId
              partnerServiceId: data.id,
              serviceName: data.serviceName,
              accessGranted: false,
            });
            this.setState({ retianedServices: tempServ });
          }
        });
      }
    });
    this.setState({ show: true });
  };

  onClickSubmit = () => {
    let tempObj;
    tempObj = {
      clientId: localStorage.getItem('partner_id'),
      partnerId: this.state.partnerId,
      sharedServices: [
        {
          packageId: this.state.packageId,
          packageName: this.state.packageName,
          accessGranted: true,
          isAdmin: this.state.isAdmin,
          services: this.state.retianedServices,
        },
      ],
    };
    this.props.putPartnerPackage(tempObj);
    this.setState({ show: false });
  };

  showDetails = (val, data) => {
    let tempArr = [];
    val.map((data) => {
      tempArr.push({
        name: data.name,
        count: data.count,
        utilized: data.utilized,
        remianing: data.remianing,
        cost: data.cost,
        // failure: data.failure,
      });
    });
    this.setState({ services: tempArr });
  };

  putPartnerPackageResponse = () => {
    if (this.props.putPartnerPackageInfo !== undefined) {
      if (this.props.putPartnerPackageInfo.data !== undefined) {
        if (this.state.putApi) {
          this.setState({ putApi: false });
          if (this.props.putPartnerPackageInfo.data.status === 'success') {
            this.setState({
              successMessage: this.props.putPartnerPackageInfo.data.message,
            });
            this.setState({ confirmSuccess: true });
          } else {
            this.setState({
              successMessage: 'Services grant id denied',
            });
          }
        }
      }
    }
  };

  onOk = () => {
    this.setState({ confirmSuccess: false });
    this.setState({ getPackFlag: true });
    this.props.getAllPurchasedPackages(false, this.state.partnerId);
  };

  onNo = () => {
    this.setState({ show: false });
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
              marginBottom="30px"
              justifyContent="space-between"
              alignItems="center"
            >
              <CustomText
                color="#ffff"
                fontSize="30px"
                fontWeight={200}
                className={classes.title}
              >
                Dashboard
              </CustomText>
              <ButtonComponent
                className={classes.button}
                backgroundColor={'white'}
                onClick={this.onBoardPartner}
                labelColor={'#0898be'}
                height={'40.1px'}
                // width={'108.4px'}
                fontSize={'18px'}
                hoverColor={'white'}
              >
                OnBoard Partner
              </ButtonComponent>
            </Box>
            <CollapsibleTable
              onClick={(val, flag) => this.expand(val, flag)}
              deleteRow={(val, data) => this.deleteRow(val, data)}
              showDetails={(val, data) => this.showDetails(val, data)}
              services={this.state.services}
              rows={this.state.allPartners}
              header={headerData}
              packages={this.state.packages}
            />
          </Container>
          {this.state.show ? (
            <ModalUi
              title={'Confirm Delete'}
              isOpen={this.state.show}
              primaryText={'Submit'}
              onPrimaryClick={this.onClickSubmit}
              secondaryText="No"
              onClose={this.onNo}
            >
              <CustomText color="red" fontSize="15px" fontWeight={200}>
                Are you sure ,want to delete the {this.state.deletedService}{' '}
                service in {this.state.packageName} package
              </CustomText>
            </ModalUi>
          ) : (
            ''
          )}
          {this.state.confirmSuccess ? (
            <ModalUi
              title={'Package Details'}
              isOpen={this.state.confirmSuccess}
              primaryText={'OK'}
              onPrimaryClick={this.onOk}
            >
              <CustomText color="#4b485e" fontSize="18px">
                {this.state.successMessage}
              </CustomText>
            </ModalUi>
          ) : (
            ''
          )}
          {this.props.getAllPartnersByClientInfo &&
          this.props.getAllPartnersByClientInfo
            ? this.getAllPartners()
            : ''}
          {this.props.getAllPurchasedPackagesInfo &&
          this.props.getAllPurchasedPackagesInfo
            ? this.getPartnersPackages()
            : ''}
          {this.props.putPartnerPackageInfo && this.props.putPartnerPackageInfo
            ? this.putPartnerPackageResponse()
            : ''}
        </SubWrapper>
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getAllPartnersByClientInfo: state.getAllPartnersByClient,
    getAllPurchasedPackagesInfo: state.getAllPurchasedPackages,
    putPartnerPackageInfo: state.putPartnerPackage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPartnersByClient: () => dispatch(getAllPartnersByClient()),
    getAllPurchasedPackages: (x, y) => dispatch(getAllPurchasedPackages(x, y)),
    setAllPackages: () => dispatch(setAllPackages()),
    putPartnerPackage: (x) => dispatch(putPartnerPackage(x)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(Dashboard);
