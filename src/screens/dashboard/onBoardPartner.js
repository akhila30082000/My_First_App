import React, { Component } from 'react';
import MainScreen from '../../components/common/MainScreen';
import loginimage from '../../assets/background.png';
import { Box, styled, Container, withStyles } from '@material-ui/core';
import CustomText from '../../components/common/CustomText';
import { compose } from 'redux';
import { connect } from 'react-redux';
import TextBoxComponent from '../../components/common/TextBoxComponent';
import DropDownComponent from '../../components/common/DropdownComponent';
import EnhancedTable from '../../components/common/DataTable';
import { serviceData } from './static-data';
import ModalUi from '../../components/common/Modal';
import ChipsArray from './ServiceData';
import ButtonComponent from '../../components/common/ButtonComponent';
import {
  getAllPurchasedPackages,
  setAllPackages,
} from '../../redux/actions/getAllPurchasedpackages';
import { onBoardPartner } from '../../redux/actions/onBoardPartner';

const SubWrapper = styled('div')({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  backgroundRepeat: 'no-repeat',
  justifyContent: 'space-between',
  backgroundImage: `url(${loginimage})`,
});
const Content = styled(`div`)({});

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
class OnBoardPartner extends Component {
  state = {
    partnerName: '',
    packagesList: [],
    checkboxValue: [],
    packageName: '',
    apiFlag: true,
    packages: [],
    services: [],
    show: false,
    selectedServices: [],
    chipData: [],
    choosenPacks: [],
    submitData: [],
    packageDetails: [],
    onBoardApi: true,
    confirmPartner: false,
    successMessage: '',
    isAdmin: '',
  };
  componentDidMount() {
    this.props.getAllPurchasedPackages(
      true,
      localStorage.getItem('partner_id'),
    );
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getAllPackages = () => {
    let tempArray = [];
    if (this.props.getAllPurchasedPackagesInfo !== undefined) {
      if (this.props.getAllPurchasedPackagesInfo.data !== undefined) {
        if (this.state.apiFlag) {
          this.setState({ apiFlag: false });
          this.props.getAllPurchasedPackagesInfo.data.map((data) => {
            let tempValue = {
              label: data.packageName,
              value: data.packageId,
            };
            tempArray.push(tempValue);
            return null;
          });
          this.setState({
            packages: this.props.getAllPurchasedPackagesInfo.data,
          });
          this.setState({
            packagesList: [...tempArray],
          });
        }
        this.props.setAllPackages();
      }
    }
  };
  dropDownOnchangeFun = (e) => {
    let tempArr = [];
    this.setState({ packageError: false });
    this.setState({ packageValue: e.target.value });
    this.state.packages.map((data) => {
      if (data.packageId === e.target.value) {
        data.services.map((data2) => {
          tempArr.push({
            name: data2.id,
            services: data2.serviceName,
          });
        });
        this.setState({ packageName: data.packageName });
        this.setState({ isAdmin: data.isAdmin });
      }
    });
    this.setState({ services: tempArr });
    this.setState({ show: true });
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
  };
  onNo = () => {
    this.props.setAllPackages();
    this.setState({ services: [] });
    this.setState({ show: false });
    this.setState({ checkboxValue: [] });
  };
  onClickSubmit = () => {
    let tempArray = [];
    let selectedPackages = [];
    //   packageName: this.state.packageName,
    //   services:
    this.state.checkboxValue.map((data) => {
      this.state.services.map((item) => {
        if (item.name === data) {
          tempArray.push({
            key: item.name,
            label: item.services,
          });
        }
      });
    });
    this.setState({ chipData: tempArray });
    this.setState({ show: false });
    selectedPackages.push({
      packageName: this.state.packageName,
      packageId: this.state.packageValue,
      chipData: tempArray,
      isAdmin: this.state.isAdmin,
    });
    this.setState({
      packageDetails: [...this.state.packageDetails, ...selectedPackages],
    });
  };

  deleteFunc = (data, name) => {
    let tempArr = [];
    let packages = [];
    this.setState((prev) => ({
      ...prev,
      chipData: prev.chipData.filter((chip) => chip.key !== data.key),
    }));
    tempArr = this.state.chipData.filter((chip) => chip.key !== data.key);
    packages = this.state.packageDetails.map((val) => {
      if (val.packageName === name) {
        return {
          ...val,
          chipData: val.chipData.filter((item) => item.key !== data.key),
        };
      } else return { ...val };
    });
    this.setState({ packageDetails: packages });
  };

  submitPartner = () => {
    let tempObj;
    tempObj = {
      clientId: localStorage.getItem('partner_id'),
      partnerName: this.state.partnerName,
      location: this.state.location,
      emailId: this.state.email,
      isAdminOnBoarding: false,
      sharedServices: this.state.packageDetails.map((data) => {
        return {
          packageId: data.packageId,
          packageName: data.packageName,
          isAdmin: data.isAdmin,
          accessGranted: true,
          services: data.chipData.map((item) => {
            return {
              serviceId: item.key,
              serviceName: item.label,
              accessGranted: true,
            };
          }),
        };
      }),
    };
    this.setState({ submitData: tempObj });
    this.props.onBoardPartner(tempObj);
  };

  onOk = () => {
    this.setState({ confirmPartner: false });
    this.props.history.push('/dashboard');
  };

  onBoarded = () => {
    if (this.props.onBoardPartnerInfo !== undefined) {
      if (this.props.onBoardPartnerInfo.data !== undefined) {
        if (this.props.onBoardPartnerInfo.data.status === 'success') {
          if (this.state.onBoardApi) {
            this.setState({ onBoardApi: false });
            this.setState({
              successMessage: this.props.onBoardPartnerInfo.data.message,
            });
            this.setState({ confirmPartner: true });
          }
        } else {
          this.setState({
            successMessage: 'Partner is not Created!!!',
          });
        }
      }
    }
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
              <Box>
                <CustomText
                  color="#ffff"
                  fontSize="30px"
                  fontWeight={200}
                  className={classes.title}
                >
                  Partner OnBoarding
                </CustomText>
                <Content style={{ marginTop: '10px' }}>
                  <TextBoxComponent
                    label={'Client'}
                    type={'text'}
                    value={localStorage.getItem('partner_id')}
                  ></TextBoxComponent>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <TextBoxComponent
                    label={'Partner Name'}
                    error={this.state.partnerNameError}
                    helperText={this.state.partnerNameMessage}
                    type={'text'}
                    name="partnerName"
                    value={this.state.partnerName}
                    onChange={this.handleChange}
                  ></TextBoxComponent>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <TextBoxComponent
                    label={'Email'}
                    error={this.state.emailError}
                    helperText={this.state.emailErrorMessage}
                    type={'text'}
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></TextBoxComponent>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <TextBoxComponent
                    label={'Location'}
                    error={this.state.locationError}
                    helperText={this.state.locationErrorMessage}
                    type={'text'}
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  ></TextBoxComponent>
                </Content>
                <Content style={{ marginTop: '10px' }}>
                  <DropDownComponent
                    dropdownOption={this.state.packagesList}
                    onChange={this.dropDownOnchangeFun}
                    value={this.state.packageValue}
                    label={'Packages'}
                    error={this.state.packageError}
                    helperText={'Select Package'}
                  />
                </Content>
                <ButtonComponent
                  className={classes.button}
                  onClick={this.submitPartner}
                  height={'40.1px'}
                  disabled={
                    this.state.packageDetails.length !== 0 ? false : true
                  }
                  backgroundColor={
                    this.state.packageDetails.length !== 0 ? 'white' : '#808080'
                  }
                  labelColor={
                    this.state.packageDetails.length !== 0 ? '#0898be' : '#ffff'
                  }
                  // width={'108.4px'}
                  fontSize={'18px'}
                  hoverColor={'white'}
                >
                  Create Partner
                </ButtonComponent>
              </Box>
              <Box
                marginTop="30px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                {this.state.packageDetails.length !== 0
                  ? this.state.packageDetails.map((data) => {
                      return (
                        <ChipsArray
                          packageName={data.packageName}
                          chipData={data.chipData}
                          deleteFunc={(val, name) => this.deleteFunc(val, name)}
                        />
                      );
                    })
                  : ''}
              </Box>
              {this.state.show ? (
                <ModalUi
                  title={'Package Details'}
                  isOpen={this.state.show}
                  primaryText={'Submit'}
                  onPrimaryClick={this.onClickSubmit}
                  secondaryText="No"
                  onClose={this.onNo}
                >
                  <EnhancedTable
                    headCells={serviceData}
                    rows={this.state.services}
                    //   edit={this.state.editFlag}
                    checkBoxValue={this.state.checkboxValue}
                    // eslint-disable-next-line no-console
                    onClick={(val) => this.checkboxOnchange(val)}
                  />
                </ModalUi>
              ) : (
                ''
              )}
              {this.state.confirmPartner ? (
                <ModalUi
                  title={'Package Details'}
                  isOpen={this.state.confirmPartner}
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
            </Box>
          </Container>
        </SubWrapper>
        {this.props.getAllPurchasedPackagesInfo &&
        this.props.getAllPurchasedPackagesInfo
          ? this.getAllPackages()
          : ''}
        {this.props.onBoardPartnerInfo && this.props.onBoardPartnerInfo
          ? this.onBoarded()
          : ''}
      </MainScreen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAllPurchasedPackagesInfo: state.getAllPurchasedPackages,
    onBoardPartnerInfo: state.onBoardPartner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPurchasedPackages: (x, y) => dispatch(getAllPurchasedPackages(x, y)),
    onBoardPartner: (x) => dispatch(onBoardPartner(x)),
    setAllPackages: () => dispatch(setAllPackages()),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(OnBoardPartner);
