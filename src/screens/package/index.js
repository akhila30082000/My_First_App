import React, { Component } from 'react';
import MainScreen from '../../components/common/MainScreen';
import PackageCard from '../../components/common/PackageCard';
import { customPlan, headCells } from './static-data';
import backgroundImg from '../../assets/background.png';
import { Box, Container, styled } from '@material-ui/core';
import ModalUi from '../../components/common/Modal';
import EnhancedTable from '../../components/common/DataTable';
import {
  getAllPackages,
  setPackages,
} from '../../redux/actions/getAllPackagesDetails';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  getPackageDataById,
  setPackageDataById,
} from '../../redux/actions/getPackageDataById';
import CustomText from '../../components/common/CustomText';
import TextBoxComponent from '../../components/common/TextBoxComponent';
import DropDownComponent from '../../components/common/DropdownComponent';
import TextAreaComponent from '../../components/common/TextAreaComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import {
  deletePackageById,
  setDeletePackageById,
} from '../../redux/actions/deletePackage';
import SnackBarComponent from '../../components/common/SnackBarComponent';
import { updatePackage } from '../../redux/actions/updatePackage';
import {
  getAllPurchasedPackages,
  setAllPackages,
} from '../../redux/actions/getAllPurchasedpackages';
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
});
class Package extends Component {
  state = {
    flag: false,
    title: '',
    packages: [],
    apiFlag: true,
    modalApiFlag: true,
    rows: [],
    packageTypeList: [
      // { label: 'Quarterly', value: 'Quarterly' },
      { label: 'Monthly', value: 'monthly' },
      // { label: 'Yearly', value: 'Yearly' },
    ],
    packageDescription: '',
    packageType: '',
    packageName: '',
    animate:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.animate) ||
      false,
    errorPackageNameFlag: false,
    errorPackageName: '',
    errorPackageTypeFlag: false,
    errorPackageType: '',
    errorPackageDescFlag: false,
    errorPackageDesc: '',
    checkboxValue: [],
    packageData: '',
    cartFlag: false,
    cartData: [],
    chooseFlag:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.choosePackages) ||
      false,
    prevPackageData:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.packageData) ||
      false,
    selectedPackages: [],
    select: false,
    edit: false,
    modulesList: [],
    partnerId:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.partnerId) ||
      false,
    delete: false,
    deleteApistatus: true,
    open: false,
    message: '',
    updateApi: true,
    purchasedPackages: [],
    purchasedIds: [],
    purchasedNames: [],
    apiAllPackFlag: true,
  };
  componentDidMount() {
    this.props.getAllPackages();
    this.props.getAllPurchasedPackages(
      true,
      localStorage.getItem('partner_id'),
    );
  }
  getAllPackages = () => {
    let x = false;
    let tempArray = [];
    if (this.props.getAllPackagesInfo !== undefined) {
      if (this.props.getAllPackagesInfo.data !== undefined) {
        if (this.state.apiFlag) {
          this.setState({ apiFlag: false });
          this.props.getAllPackagesInfo.data.map((data) => {
            data.services.filter((data2) => {
              if (data2.status !== 'inactive') {
                x = true;
              }
              return null;
            });
            if (x) {
              tempArray.push(data);
              x = false;
            }
            return null;
          });
          this.setState({
            packages: [...tempArray, ...customPlan],
          });
        }
        this.props.setPackages();
      }
    }
  };
  getAllPurchasedPackagesDetails = () => {
    let tempIds = [];
    let tempArray = [];
    let tempNames = [];
    if (this.props.getAllPurchasedPackagesInfo !== undefined) {
      if (this.props.getAllPurchasedPackagesInfo.data !== undefined) {
        if (this.state.apiAllPackFlag) {
          this.setState({ apiAllPackFlag: false });
          if (this.props.getAllPurchasedPackagesInfo.status === 200) {
            this.props.getAllPurchasedPackagesInfo.data.map((data) => {
              tempIds.push(data.packageId);
              tempNames.push(data.packageName);
              if (data.status === 'active') {
                tempArray.push(data);
              }
              return null;
            });
            this.setState({ purchasedNames: tempNames });
            this.setState({ purchasedIds: tempIds });
            this.setState({
              purchasedPackages: tempArray,
            });
          }
        } else {
        }
        this.props.setAllPackages();
      }
    }
  };
  getPackageDataByID = () => {
    let tempArray = [];
    let tempObj;
    if (this.props.getPackageDataByIdInfo !== undefined) {
      if (this.props.getPackageDataByIdInfo.services !== undefined) {
        if (this.state.modalApiFlag) {
          this.setState({ packageData: this.props.getPackageDataByIdInfo });
          this.setState({
            packageId: this.props.getPackageDataByIdInfo.packageId,
          });
          if (this.state.edit) {
            this.setState({
              packageName: this.props.getPackageDataByIdInfo.packageName,
            });
            this.setState({
              packageType: this.props.getPackageDataByIdInfo.packageType,
            });
            this.setState({
              packageDescription: this.props.getPackageDataByIdInfo
                .packageDescription,
            });
            this.setState({
              services: this.props.getPackageDataByIdInfo.services,
            });
          }
          this.setState({ modalApiFlag: false });
          this.props.getPackageDataByIdInfo.services.map((data) => {
            tempObj = {
              id: '',
              module: data.moduleName,
              service: data.serviceName,
              version: data.version,
            };
            data.apis.length > 0
              ? data.apis.map((data2) => {
                  let tempdata = {
                    api: data2.apiName,
                    httpType: data2.httpType,
                    status: data2.status,
                  };
                  tempObj = { ...tempObj, ...tempdata };
                  tempArray.push(tempObj);
                  return null;
                })
              : tempArray.push(tempObj);
            tempArray.map((item, id) => {
              if (item.api === undefined) tempArray.splice(id, 1);
              return null;
            });
            this.setState({ rows: tempArray });
            return null;
          });
        }
        this.props.setPackageDataById();
      }
    }
  };
  onClick = (title, id, flag) => {
    this.setState({ title: title });
    if (title !== 'Custom') this.props.getPackageDataById(flag, id);
    this.setState({ rows: [] });
    this.setState({ modalApiFlag: true });
    this.setState({ flag: true });
  };
  onEdit = (id) => {
    this.props.getPackageDataById(id);
    this.setState({ flag: true });
    this.setState({ edit: true });
    this.setState({ modalApiFlag: true });
  };
  onDelete = (flag, id) => {
    this.setState({ packageId: id });
    this.props.getPackageDataById(flag, id);
    this.setState({ flag: true });
    this.setState({ delete: true });
  };
  handleChange = (e) => {
    if (e.target.name === 'packageName') {
      this.setState({ errorPackageNameFlag: false });
    } else if (e.target.name === 'packageDescription') {
      this.setState({ errorPackageDescFlag: false });
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  onDropdownChange = (e) => {
    this.setState({ errorPackageTypeFlag: false });
    this.setState({ packageType: e.target.value });
  };
  onSelect = () => {
    if (this.state.title === 'Custom' || this.state.edit) {
      if (this.state.packageName === '') {
        this.setState({ errorPackageNameFlag: true });
      } else if (this.state.packageType === '') {
        this.setState({ errorPackageTypeFlag: true });
      } else if (this.state.packageDescription === '') {
        this.setState({ errorPackageDescFlag: true });
      } else {
        if (this.state.edit) {
          this.props.setPackageDataById();
          let modulesList = [];
          this.state.packageData.services.map((data) => {
            modulesList.push({
              moduleId: data.moduleId,
            });
            return null;
          });
          this.props.history.push('/customplan', {
            packageName: this.state.packageName,
            packageType: this.state.packageType,
            packageDescription: this.state.packageDescription,
            packageId: this.state.packageId,
            editFlag: true,
            modulesList: modulesList,
            partnerId: this.state.partnerId,
          });
        } else
          this.props.history.push('/customplan', {
            packageName: this.state.packageName,
            packageType: this.state.packageType,
            packageDescription: this.state.packageDescription,
            packageId: this.state.packageId,
            partnerId: this.state.partnerId,
          });
        this.setState({ packages: [] });
        this.setState({ flag: false });
      }
    } else if (this.state.delete) {
      this.props.deletePackageById(this.state.packageId);
      this.setState({ delete: false });
      this.setState({ flag: false });
    } else {
      this.props.setPackageDataById();
      let tempObj, packages;
      let tempArray = [];
      tempObj = {
        packageId: this.state.packageData.packageId,
        packageName: this.state.packageData.packageName,
        cost: this.state.packageData.packageCost,
        totalHits: this.state.packageData.totalNoOfHits,
        totalApis: this.state.packageData.noOfApis,
      };
      tempArray.push(tempObj);
      this.setState({ cartData: [...this.state.cartData, ...tempArray] });
      this.setState({ cartFlag: true });
      this.setState({ flag: false });
      packages = this.state.packages.filter(
        (o1) => tempArray.some((o2) => o1.packageId === o2.packageId),
        this.setState({ select: true }),
      );
      this.setState({
        selectedPackages: [...this.state.selectedPackages, ...packages],
      });
    }
  };
  onNo = () => {
    this.setState({ flag: false });
    this.props.setPackageDataById();
    if (this.state.edit) {
      this.setState({ packageName: '' });
      this.setState({ packageType: '' });
      this.setState({ packageDescription: '' });
      this.setState({ edit: false });
    }
    if (this.state.delete) {
      this.setState({ packageName: '' });
      this.setState({ packageType: '' });
      this.setState({ packageDescription: '' });
      this.setState({ delete: false });
      this.setState({ packageId: '' });
    }
  };
  goToCart = () => {
    let tempArr = [];
    this.setState({ animate: false });
    this.props.setPackageDataById();
    if (this.state.chooseFlag) {
      tempArr = [...this.state.cartData, ...this.state.prevPackageData];
    } else tempArr = this.state.cartData;
    this.props.history.push('/cart', {
      packageData: tempArr,
    });
  };
  deleteResponse = () => {
    if (this.props.deletePackageByIdInfo !== undefined) {
      if (this.props.deletePackageByIdInfo.data !== undefined) {
        if (this.state.deleteApistatus) {
          this.setState({ deleteApistatus: false });
          if (this.props.deletePackageByIdInfo.data.status === 'success') {
            this.setState({ apiFlag: true });
            this.props.getAllPackages();
            this.setState({ flag: false });
            this.setState({ packageId: '' });
          } else {
            this.setState({ open: true });
            this.setState({ message: 'Failed to delete Package' });
          }
        }
        this.props.setDeletePackageById();
      }
    }
  };
  updatePackageFunc = () => {
    if (this.props.updatePackageInfo !== undefined) {
      if (this.props.updatePackageInfo.data !== undefined) {
        if (this.state.updateApi) {
          this.setState({ updateApi: false });
          if (this.props.updatePackageInfo.data.status === 'success') {
            this.props.getAllPackages();
            this.setState({ apiFlag: true });
            this.setState({ flag: false });
          } else {
            this.setState({ open: true });
            this.setState({ message: 'Failed to delete Package' });
          }
        }
      }
    }
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  home = () => {
    this.props.history.push('./home');
  };
  submit = () => {
    let requestObj;
    let tempObj = [];
    requestObj = {
      packageId: this.state.packageId,
      packageName: this.state.packageName,
      packageDescription: this.state.packageDescription,
      packageType: this.state.packageType,
      services: this.state.services.map((data) => {
        // eslint-disable-next-line no-unused-vars
        return (tempObj = {
          ...data,
          cost: data.cost.substring(1),
        });
      }),
    };
    this.setState({ edit: false });
    this.props.updatePackage(requestObj);
    this.setState({ packageName: '' });
    this.setState({ packageDescription: '' });
    this.setState({ packageType: '' });
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
                Available Packages
              </CustomText>
              <Box display="flex" flexDirection="row">
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
                <ButtonComponent
                  className={classes.button}
                  height={'40.1px'}
                  width={'140px'}
                  fontSize={'18px'}
                  backgroundColor={this.state.cartFlag ? 'white' : '#808080'}
                  hoverColor={'white'}
                  labelColor={this.state.cartFlag ? '#0898be' : '#ffff'}
                  disabled={this.state.cartFlag ? false : true}
                  onClick={this.state.cartFlag ? this.goToCart : ''}
                >
                  Go To Cart
                </ButtonComponent>
              </Box>
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
                    select={this.state.selectedPackages.some(
                      (o) => o.packageId === data.packageId,
                    )}
                    packageData={this.state.selectedPackages}
                    title={data.packageName}
                    cost={data.packageCost}
                    type={
                      id === this.state.packages.length - 1
                        ? data.packageType
                        : '/' + data.packageType
                    }
                    description={data.description}
                    noOfApis={data.noOfApis}
                    totalNoOfHits={data.totalNoOfHits}
                    packageStatus={this.state.purchasedNames.some(
                      (i) => i === data.packageName,
                    )}
                    onEdit={(_val) => this.onEdit(data.packageId)}
                    onDelete={(_val) =>
                      this.onDelete(data.isAdmin, data.packageId)
                    }
                    onClick={(_val) =>
                      this.onClick(
                        data.packageName,
                        data.packageId,
                        data.isAdmin,
                      )
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
            onPrimaryClick={(e) => this.onSelect(e)}
            primaryText={
              this.state.title === 'Custom' || this.state.edit
                ? 'Choose Modules'
                : this.state.delete
                ? 'Confirm'
                : 'Add To Cart'
            }
            tertiary={this.state.edit ? 'Submit' : ''}
            onTertiaryClick={(e) => this.submit(e)}
          >
            {this.state.title === 'Custom' || this.state.edit ? (
              <>
                <Box className={classes.root}>
                  <TextBoxComponent
                    width="250px"
                    error={this.state.errorPackageNameFlag}
                    type={'text'}
                    name="packageName"
                    value={this.state.packageName}
                    helperText="Enter Package Name"
                    onChange={this.handleChange}
                    label="Package Name"
                    lableColor="#4b485e"
                    borderBottom="1.5px solid #0279a8"
                  ></TextBoxComponent>
                  <DropDownComponent
                    width="250px"
                    error={this.state.errorPackageTypeFlag}
                    helperText="Choose Package Type"
                    label="Package Type"
                    backgroundColor="1.5px solid #0279a8"
                    iconColor="#0279a8"
                    labelColor="#4b485e"
                    dropdownOption={this.state.packageTypeList}
                    onChange={this.onDropdownChange}
                    value={this.state.packageType}
                  />
                </Box>
                <TextAreaComponent
                  label="Package Description"
                  error={this.state.errorPackageDescFlag}
                  helperText="Enter Package Description"
                  name="packageDescription"
                  value={this.state.packageDescription}
                  onChange={this.handleChange}
                  bordercolor={'#0279a8'}
                  color={'#4b485e'}
                />
              </>
            ) : this.state.delete ? (
              <Box>
                <CustomText color="#4b485e">
                  Do yout want to delete the Package?
                </CustomText>
              </Box>
            ) : (
              <EnhancedTable
                checkBoxValue={this.state.checkboxValue}
                flag={false}
                headCells={headCells}
                rows={this.state.rows}
                // eslint-disable-next-line no-console
                onClick={(val) => console.log('checkboxValue', val)}
                noOfApis={this.state.packageData.totalNoOfHits}
                cost={this.state.packageData.packageCost}
              />
            )}
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

          {this.props.getAllPackagesInfo && this.props.getAllPackagesInfo
            ? this.getAllPackages()
            : ''}
          {this.props.getPackageDataByIdInfo &&
          this.props.getPackageDataByIdInfo
            ? this.getPackageDataByID()
            : ''}
          {this.props.deletePackageByIdInfo && this.props.deletePackageByIdInfo
            ? this.deleteResponse()
            : ''}
          {this.props.updatePackageInfo && this.props.updatePackageInfo
            ? this.updatePackageFunc()
            : ''}
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
    getAllPackagesInfo: state.getAllPackages,
    getPackageDataByIdInfo: state.getPackageDataById,
    deletePackageByIdInfo: state.deletePackageById,
    updatePackageInfo: state.updatePackage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllPackages: () => dispatch(getAllPackages()),
    setPackages: () => dispatch(setPackages()),
    getPackageDataById: (x, y) => dispatch(getPackageDataById(x, y)),
    setPackageDataById: () => dispatch(setPackageDataById()),
    deletePackageById: (x) => dispatch(deletePackageById(x)),
    updatePackage: (x) => dispatch(updatePackage(x)),
    getAllPurchasedPackages: (x, y) => dispatch(getAllPurchasedPackages(x, y)),
    setAllPackages: () => dispatch(setAllPackages()),
    setDeletePackageById: () => dispatch(setDeletePackageById()),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(Package);
