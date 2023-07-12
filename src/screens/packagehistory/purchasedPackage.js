import React, { Component } from 'react';
import MainScreen from '../../components/common/MainScreen';
import PackageCard from '../../components/common/PackageCard';
import backgroundImg from '../../assets/background.png';
import { Box, Container, styled } from '@material-ui/core';
import ModalUi from '../../components/common/Modal';
import EnhancedTable from '../../components/common/DataTable';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import CustomText from '../../components/common/CustomText';
import SnackBarComponent from '../../components/common/SnackBarComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import {
  getAllPurchasedPackages,
  setAllPackages,
} from '../../redux/actions/getAllPurchasedpackages';
import { headCells } from './static-data';
const SubWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'row',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-between',
  backgroundImage: `url(${backgroundImg})`,
});
const Card = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  float: 'left',
  alignItems: 'center',
});
const useStyles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  button: {
    position: 'fixed',
    right: '115px',
  },
});
class PurchasedPackage extends Component {
  state = {
    flag: false,
    title: '',
    packages: [],
    apiFlag: true,
    modalApiFlag: true,
    rows: [],

    packageName: '',
    animate:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.animate) ||
      false,
    checkboxValue: [],
    packageData: '',
    open: false,
    message: '',
  };
  componentDidMount() {
    if (localStorage.getItem('clientStatus') !== '') {
      this.props.getAllPurchasedPackages(
        true,
        localStorage.getItem('partner_id'),
      );
    } else {
      this.props.getAllPurchasedPackages(
        false,
        localStorage.getItem('partner_id'),
      );
    }
  }
  getAllPurchasedPackagesDetails = () => {
    let tempArray = [];
    if (this.props.getAllPurchasedPackagesInfo !== undefined) {
      if (this.props.getAllPurchasedPackagesInfo.data !== undefined) {
        if (this.state.apiFlag) {
          this.setState({ apiFlag: false });
          if (this.props.getAllPurchasedPackagesInfo.status === 200) {
            this.props.getAllPurchasedPackagesInfo.data.map((data) => {
              tempArray.push(data);
              return null;
            });
            this.setState({
              packages: tempArray,
            });
          }
        } else {
        }
        this.props.setAllPackages();
      }
    }
  };
  getPackageDataByID = (id) => {
    let tempArray = [];
    let tempObj;
    let services = [];
    this.state.packages.map((item) => {
      if (item.packageId === id) {
        this.setState({ packageData: item });
        this.setState({
          packageId: item.packageId,
        });
        services = item.services;
        // data.apis.length > 0
        //   ? data.apis.map((data2) => {
        //       let tempdata = {
        //         api: data2.apiName,
        //         httpType: data2.httpType,
        //       };
        //       tempObj = { ...tempObj, ...tempdata };
        //       tempArray.push(tempObj);
        //       return null;
        //     })
        //   :
      }
      return null;
    });
    services.map((data) => {
      tempObj = {
        id: '',
        module: data.moduleName,
        service: data.serviceName,
        version: data.version,
        requestCount: data.requestsCount,
        requestsUtilized: data.requestsUtilized,
        status: data.status,
      };
      tempArray.push(tempObj);
      this.setState({ rows: tempArray });
      return null;
    });
  };
  onClick = (title, id) => {
    this.setState({ title: title });
    this.getPackageDataByID(id);
    // this.setState({ rows: [] });
    this.setState({ modalApiFlag: true });
    this.setState({ flag: true });
  };
  onNo = () => {
    this.setState({ flag: false });
  };
  backFunc = () => {
    this.props.history.push('/package');
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
              alignItems="center"
              marginTop="30px"
            >
              <CustomText fontSize="30px" fontWeight={200} color="#ffffff">
                Purchased Packages
              </CustomText>
              <ButtonComponent
                className={classes.button}
                height={'40.1px'}
                width={'140px'}
                fontSize={'18px'}
                backgroundColor={'white'}
                hoverColor={'white'}
                labelColor={'#0898be'}
                onClick={this.backFunc}
              >
                Back
              </ButtonComponent>
            </Box>
            <Card>
              {this.state.packages &&
                this.state.packages.map((data, id) => (
                  <PackageCard
                    isAdmin={data.isAdmin}
                    index={
                      this.state.packages.length - 1 === id + 1 &&
                      this.state.animate !== false
                    }
                    status={data.status.toUpperCase()}
                    cost={data.packageCost}
                    title={data.packageName}
                    type={data.packageType}
                    purchase={true}
                    onClick={(_val) =>
                      this.onClick(data.packageName, data.packageId)
                    }
                  />
                ))}
            </Card>
          </Container>
          <ModalUi
            title={this.state.title + ' Plan'}
            isOpen={this.state.flag}
            secondaryText="No"
            onClose={(event) => this.onNo(event)}
          >
            <EnhancedTable
              checkBoxValue={this.state.checkboxValue}
              flag={false}
              headCells={headCells}
              rows={this.state.rows}
              // eslint-disable-next-line no-console
              onClick={(val) => console.log('checkboxValue', val)}
            />
          </ModalUi>
          {this.state.open ? (
            <SnackBarComponent
              open={this.state.open}
              onClose={this.handleClose}
              message={this.state.message}
              iconclose={this.handleClose}
            />
          ) : (
            ''
          )}

          {this.props.getAllPurchasedPackagesInfo &&
          this.props.getAllPurchasedPackagesInfo
            ? this.getAllPurchasedPackagesDetails()
            : ''}
        </SubWrapper>
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getAllPurchasedPackagesInfo: state.getAllPurchasedPackages,
    deletePackageByIdInfo: state.deletePackageById,
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
)(PurchasedPackage);
