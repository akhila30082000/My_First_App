import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import loginimage from '../../assets/background.png';
import MainScreen from '../../components/common/MainScreen';
import { connect } from 'react-redux';
import { Box, Container } from '@material-ui/core';
import { compose } from 'redux';
import ModalUi from '../../components/common/Modal';
import EnhancedTable from '../../components/common/DataTable';
import { headCellsCustomplan } from './static-data';
import { withStyles } from '@material-ui/core/styles';
import DropDown from '../../components/common/DropdownComponent';
import CustomText from '../../components/common/CustomText';
import ButtonComponent from '../../components/common/ButtonComponent';
import CustomPlanCard from '../../components/common/PackageCard/customPlan-card';
import {
  getModuleDetails,
  setGetModuleDetails,
} from '../../redux/actions/getmodulesApi';
import {
  getServicesBymodules,
  setServicesByModule,
} from '../../redux/actions/getservicesBymodule';
import {
  getVersionsByService,
  setVersionsByService,
} from '../../redux/actions/getversionsByService';
import {
  getApiListByVersion,
  setApiListByVersion,
} from '../../redux/actions/getApiListByVersion';
import { postPackage, setPostPackage } from '../../redux/actions/postPackage';
import {
  getPackageDataById,
  setPackageDataById,
} from '../../redux/actions/getPackageDataById';
import {
  setPutPackageData,
  updatePackage,
} from '../../redux/actions/updatePackage';
import {
  requestCountData,
  setrequestCountACtion,
} from '../../redux/actions/requestCountAction';
import SnackBarComponent from '../../components/common/SnackBarComponent';
import editIcon from '../../assets/edit.png';
import inactiveIcon from '../../assets/inactive.png';

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
    alignItems: 'center',
  },
  title: {
    marginTop: '30px',
  },
  button: {
    marginRight: '20px',
  },
  cost: {
    width: '250px',
  },
});

class CustomPlan extends Component {
  state = {
    flag: false,
    title: '',
    getmoduleAPi: true,
    moduleList: [],
    getServiceApi: true,
    getServiceByModuleIdList: [],
    serviceName: '',
    serviceNameError: false,
    getVersionApi: true,
    versionByServiceList: [],
    version: '',
    getApiByVersion: true,
    rowsCustomplan: [],
    apiError: false,
    apicalls: '',
    moduleId: '',
    packageId:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.packageId) ||
      false,
    packageName:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.packageName) ||
      false,
    packageTypeList: [
      { label: 'Quarterly', value: 'Quarterly' },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Yearly', value: 'Yearly' },
    ],
    packageDescription:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.packageDescription) ||
      false,
    packageType:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.packageType) ||
      false,
    apiIdList: [],
    services: [],
    versionError: false,
    versionErrorMessage: '',
    serviceNameErrorMessage: '',
    costError: false,
    costErrorMessage: '',
    requestCountError: false,
    requestCountErrorMessage: '',
    apiIdListError: false,
    moduleListId: [],
    moduleFlag: false,
    checkboxValue: [],
    isAdmin: false,
    editFlag:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.editFlag) ||
      false,
    modalApiFlag: true,
    modulesList:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.modulesList) ||
      false,
    packageData: '',
    apiData: [],
    activeServices: [],
    getApiByVersionStauts: true,
    editServiceFlag: false,
    removeFlag: false,
    requestCountApi: true,
    requestCountList: [],
    removedModule: [],
    partnerId:
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.partnerId) ||
      false,
    iscreate: true,
    open: false,
    message: '',
    isUpdate: true,
    editCheck: false,
    tempRequestCount: '',
    statusFlag: false,
    confirmFlag: false,
    postData: '',
    moduleNames: [],
    serviceNames: [],
    putData: '',
    tempFlag: false,
    tempModuleName: '',
    tempModuleId: '',
    editStatus: false,
    tempServiceName: '',
    serviceId: '',
    apiMessageStatus: false,
    apiMessage: '',
  };

  componentDidMount() {
    this.props.getModuleDetails();
    this.props.getVersionsByService();
    if (this.state.editFlag) {
      this.props.getPackageDataById(this.state.packageId);
    }
  }
  getPackageDataByID = () => {
    if (this.props.getPackageDataByIdInfo !== undefined) {
      if (this.props.getPackageDataByIdInfo.services !== undefined) {
        if (this.state.modalApiFlag) {
          this.setState({
            editPackages: this.props.getPackageDataByIdInfo.services,
          });
          this.setState({ packageData: this.props.getPackageDataByIdInfo });
          this.setState({
            packageType: this.props.getPackageDataByIdInfo.packageType,
          });
          this.setState({ modalApiFlag: false });
        }
      }
    }
  };
  onClick = (id, title) => {
    let tempIdStatus = true;
    this.setState({ moduleId: id });
    let temp = [];
    temp.push(id);
    let tempService = [];
    this.setState({ moduleListId: [...this.state.moduleListId, ...temp] });
    this.setState({ title: title });
    if (!this.state.editFlag) {
      this.setState({ getmoduleAPi: true });
      // this.props.getModuleDetails();
      this.setState({ requestCountApi: true });
      this.props.requestCountData(localStorage.getItem('partner_id'), id);
      this.setState({ flag: true });

      this.state.moduleList.map((modules) => {
        if (modules.moduleId === id) {
          if (modules.serviceDetail.length > 0) {
            modules.serviceDetail.map((service) => {
              tempService.push({
                label: service.serviceName,
                value: service.serviceId,
              });
              return null;
            });
          }
          this.setState({ getServiceByModuleIdList: tempService });
        }
        return null;
      });

      this.setState({ getServiceApi: true });
      // this.props.getServicesBymodules(id);
      // this.setState({ getServiceByModuleIdList: [] });
      this.setState({ version: '' });
      this.setState({ serviceName: '' });
      this.setState({ rowsCustomplan: [] });
      this.setState({ requestCount: '' });
      this.setState({ cost: '' });
      this.setState({ checkboxValue: [] });
    } else if (this.state.editFlag) {
      this.state.packageData.services.map((data) => {
        if (data.moduleId === id) {
          tempIdStatus = false;
          this.setState({ flag: false });
          this.setState({ tempFlag: true });
          this.setState({ tempModuleName: data.moduleName });
          this.setState({ tempModuleId: data.moduleId });
        } else if (tempIdStatus) {
          this.setState({ flag: true });
          this.props.getServicesBymodules(id);
          this.props.requestCountData(localStorage.getItem('partner_id'), id);
          this.setState({ requestCountApi: true });
        }
        return null;
      });
    }
  };
  onNo = () => {
    this.setState({ flag: false });
    this.props.setServicesByModule();
    this.setState({ serviceNameError: false });
    this.setState({ versionError: false });
    this.setState({ costError: false });
    this.setState({ requestCountError: false });
    this.setState({ getServiceByModuleIdList: [] });
    // this.setState({ versionByServiceList: [] });
    this.setState({ version: '' });
    this.setState({ serviceName: '' });
    this.setState({ rowsCustomplan: [] });
    this.setState({ requestCount: '' });
    this.setState({ cost: '' });
    this.setState({ getApiByVersionStauts: true });
    this.setState({ getServiceApi: true });
    this.setState({ getVersionApi: true });
    this.props.setrequestCountACtion();
    this.setState({ requestCountList: [] });
    this.setState({ requestCountApi: false });
    this.setState({ tempRequestCount: '' });
    this.setState({ tempServiceName: '' });
    // this.props.setApiListByVersion();
    // this.props.setVersionsByService();
  };
  activeM = (a, b) => {
    return [...a, ...b];
  };
  removeModule = () => {
    let tempActiveServices = this.state.packageData.services;
    let filtered = [...tempActiveServices].filter((data) => {
      if (data.serviceId !== this.state.serviceName) {
        return data;
      }
      return null;
    });

    let removedData = [...tempActiveServices].filter((data) => {
      if (data.serviceId === this.state.serviceName) {
        return data;
      }
      return null;
    });

    const active = [...tempActiveServices].filter((a) =>
      removedData.some((s) => s.id !== a.id),
    );
    this.setState({ editPackages: [...active] });

    this.setState((prev) => ({
      removedModule: [...prev.removedModule, ...removedData],
    }));
    this.setState((prev) => ({
      activeServices: this.activeM(prev.activeServices, filtered),
    }));
    this.setState({ flag: false });
    this.setState({ removeFlag: true });
    this.props.setServicesByModule();
    this.setState({ serviceNameError: false });
    this.setState({ versionError: false });
    this.setState({ costError: false });
    this.setState({ requestCountError: false });
    this.setState({ getServiceByModuleIdList: [] });
    this.setState({ version: '' });
    this.setState({ serviceName: '' });
    this.setState({ rowsCustomplan: [] });
    this.setState({ requestCount: '' });
    this.setState({ cost: '' });
    this.setState({ getServiceApi: true });
    this.setState({ getVersionApi: true });
    this.props.setrequestCountACtion();
    this.setState({ requestCountList: [] });
    this.setState({ requestCountApi: false });
    // this.setState({ getApiByVersion: true });
  };
  getmoduleInfo = () => {
    let temp = [];
    if (this.props.getModuleDetailsInfo !== undefined) {
      if (this.props.getModuleDetailsInfo.data) {
        if (this.state.getmoduleAPi) {
          this.setState({ getmoduleAPi: false });
          this.props.getModuleDetailsInfo.data.map((data) => {
            let tempvalue = {
              moduleId: data.channelId,
              moduleName: data.channelType.channelName,
              moduleIcon: data.moduleIcon,
              serviceDetail: data.serviceDetail,
            };
            temp.push(tempvalue);
            // data.serviceDetail.map((item) => {
            //   tempArray.push({
            //     label: item.serviceName,
            //     value: item.serviceId,
            //   });
            // });
            return null;
          });
          // this.setState({ getServiceByModuleIdList: tempArray });
          this.setState({ moduleList: temp });
        }
        this.props.setGetModuleDetails();
      }
    }
  };
  // getServicesByModuleInfo = () => {
  //   let tempArray = [];
  //   if (this.props.getServiceByModuleId !== undefined) {
  //     if (this.props.getServiceByModuleId.status === 200) {
  //       if (this.state.getServiceApi) {
  //         this.setState({ getServiceApi: false });
  //         this.props.getServiceByModuleId.data.map((data1) => {
  //           tempArray.push({
  //             label: data1.serviceName,
  //             value: data1.serviceId,
  //           });
  //           return null;
  //         });
  //         this.setState({ getServiceByModuleIdList: tempArray });
  //       }
  //     }
  //   }
  // };
  getVersionByServiceInfo = () => {
    let tempArray = [];

    if (this.props.getVersionsByServiceId !== undefined) {
      if (this.props.getVersionsByServiceId.status === 200) {
        if (this.state.getVersionApi) {
          this.setState({ getVersionApi: false });
          this.props.getVersionsByServiceId.data.map((data1) => {
            tempArray.push({
              label: data1.versionName,
              value: data1.versionId,
            });
            return null;
          });
          this.setState({ versionByServiceList: tempArray });
        }
        this.props.setVersionsByService('');
      }
    }
  };
  getApiList = () => {
    let tempArray = [];
    let tempArr = [];
    if (this.props.getApiDetailsInfo !== undefined) {
      if (this.props.getApiDetailsInfo.data !== undefined) {
        if (this.state.getApiByVersion) {
          this.setState({ getApiByVersion: false });
          if (this.props.getApiDetailsInfo.status === 200) {
            this.props.getApiDetailsInfo.data.map((data1) => {
              tempArray.push({
                name: data1.apiId,
                apiName: data1.apiName,
                Url: data1.endpoint,
                http: data1.httpType,
              });
              return null;
            });
            this.setState({ rowsCustomplan: tempArray });
            if (this.state.editFlag) {
              this.state.apiData.filter((o1) => {
                tempArray.map((o2) => {
                  if (o1.apiId === o2.name && o1.status === 'active') {
                    tempArr.push(o2.name);
                  }
                  return null;
                });
                return null;
              });
              this.setState({ checkboxValue: tempArr });
            }
            this.props.setApiListByVersion();
          } else if (this.props.getApiDetailsInfo.status === 'error') {
            this.setState({ apiMessageStatus: true });
            this.setState({
              apiMessage:
                'Apis are not available for the selected service and version',
            });
          }
        }
      }
    }
  };
  getRequestCount = () => {
    let tempArray = [];
    if (this.props.getRequestCountInfo !== undefined) {
      if (this.props.getRequestCountInfo.status === 200) {
        if (this.state.requestCountApi) {
          this.setState({ requestCountApi: false });
          this.props.getRequestCountInfo.data.map((data1) => {
            tempArray.push({
              label: data1.requestRange,
              value: data1.id,
              cost: data1.cost,
            });
            return null;
          });
          this.setState({ requestCountList: tempArray });
          if (this.state.editFlag) {
            tempArray.map((item) => {
              let x =
                item.label === 'unlimited'
                  ? item.label
                  : item.label.split('-')[1];
              if (x === this.state.tempRequestCount)
                this.setState({ requestCount: item.value });
              this.setState({ requestCountValue: this.state.tempRequestCount });
              return null;
            });
          }
        }
      }
    }
  };
  createpackageDeatilsInfo = () => {
    if (this.props.createPackageDeatails !== undefined) {
      if (this.props.createPackageDeatails.data !== undefined) {
        if (this.state.iscreate) {
          this.setState({ iscreate: false });
          if (this.props.createPackageDeatails.data.status === 'success') {
            this.props.history.push('/availablePackage', { animate: true });
          } else {
            this.setState({ open: true });
            this.setState({ message: 'Package is not created' });
          }
        }
        this.props.setPostPackage();
      }
    }
  };
  updatepackageDeatilsInfo = () => {
    if (this.props.updatePackageInfo !== undefined) {
      if (this.props.updatePackageInfo.data !== undefined) {
        if (this.state.isUpdate) {
          this.setState({ isUpdate: false });
          if (this.props.updatePackageInfo.data.status === 'success') {
            this.props.history.push('/availablePackage', { animate: true });
          } else {
            this.setState({ open: true });
            this.setState({ message: 'Package is not updated' });
          }
        }
        this.props.setPutPackageData();
      }
    }
  };
  dropDownOnchangeFun = (e) => {
    this.setState({ serviceName: e.target.value });
    this.setState({ serviceNameError: false });
    this.props.setServicesByModule();
    this.setState({ getVersionApi: true });
    this.state.getServiceByModuleIdList.map((data) => {
      if (data.value === e.target.value) {
        this.setState({ serviceId: data.value });
        this.setState({ tempServiceName: data.label });
        this.setState({ version: '' });
      }
      return null;
    });
  };
  dropDownOnchangeversionFun = (e) => {
    this.setState({ version: e.target.value });
    this.setState({ versionError: false });
    this.setState({ getApiByVersion: true });
    this.props.getApiListByVersion(this.state.serviceId, e.target.value);
    // this.setState({ rowsCustomplan: [] });
  };
  dropDownOnchangeRequestCount = (e) => {
    let x;
    this.setState({ requestCount: e.target.value });
    this.setState({ requestCountError: false });
    this.setState({ getRequestCount: true });
    this.state.requestCountList.map((item) => {
      if (item.value === e.target.value) {
        this.setState({ cost: item.cost });
        x = item.label.split('-');
        this.setState({ requestCountValue: x[x.length - 1] });
      }
      return null;
    });
  };

  formating = (id, serviceId) => {
    let y;
    const w = [];
    let apiStatus = [];
    let newData = [];
    let newActive = [];
    if (
      this.state.serviceName === serviceId &&
      this.state.checkboxValue.length > this.state.apiData.length
    ) {
      let arr1 = this.state.apiData;
      let arr2 = this.state.checkboxValue;
      arr1.map((o1) => {
        if (!this.state.checkboxValue.includes(o1.apiId)) {
          y = 'inactive';
          apiStatus.push(y);
          w.push({
            id: o1.id,
            apiId: o1.apiId,
            status: y,
          });
        }
        if (
          this.state.checkboxValue.includes(o1.apiId) &&
          o1.status === 'inactive'
        ) {
          y = 'active';
          apiStatus.push(y);
          w.push({
            id: o1.id,
            apiId: o1.apiId,
            status: y,
          });
          newActive.push({
            id: o1.id,
            apiId: o1.apiId,
            status: y,
          });
        }
        return null;
      });
      const a = Object.values({ ...arr1.apiId, ...arr2 });
      a.forEach((s) => {
        const c1 = arr1.find((g) => g.apiId === s);
        if (c1) {
          w.push({
            apiId: c1.apiId,
            id: c1.id,
            status: c1.status,
          });
          apiStatus.push(c1.status);
        } else if (id === this.state.version) {
          const c2 = arr2.indexOf(s);
          if (c2 !== -1) {
            w.push({
              apiId: s,
            });
            newData.push(w);
          }
        }
        w.forEach((o, id) =>
          newActive.map((data) => {
            if (o.id === data.id && o.status === 'inactive') {
              w.splice(id, 1);
            }
            return null;
          }),
        );
      });
    } else if (
      this.state.serviceName === serviceId &&
      this.state.checkboxValue.length <= this.state.apiData.length
    ) {
      let arr1 = this.state.apiData;
      let arr2 = this.state.checkboxValue;
      let tempArr = [];
      arr1.map((o1) => {
        tempArr.push(o1.apiId);
        if (arr2.includes(o1.apiId) && o1.status === 'active') {
          y = o1.status;
          apiStatus.push(y);
          w.push({
            id: o1.id,
            apiId: o1.apiId,
            status: y,
          });
        } else if (arr2.includes(o1.apiId) && o1.status === 'inactive') {
          y = 'active';
          apiStatus.push(y);
          w.push({
            id: o1.id,
            apiId: o1.apiId,
            status: y,
          });
        } else {
          y = 'inactive';
          apiStatus.push(y);
          w.push({
            id: o1.id,
            apiId: o1.apiId,
            status: y,
          });
        }
        return null;
      });
      if (id === this.state.version) {
        var res = this.state.checkboxValue.filter(function (n) {
          return !this.has(n);
        }, new Set(tempArr));
        res.map((data) => {
          w.push({
            apiId: data,
          });
          newData.push(w);
          return null;
        });
      }
    }
    return {
      apis: w,
      status:
        apiStatus.includes('active') || newData.length > 0
          ? 'active'
          : 'inactive',
    };
  };

  handleChange = (e) => {
    switch (e.target.name) {
      case 'cost':
        this.setState({ costError: false });
        break;
      case 'requestCount':
        this.setState({ requestCountError: false });
        break;

      default:
        break;
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  checkboxOnchange = (val) => {
    let temparray = [];
    val &&
      val.map((data) => {
        temparray.push(data);
        return null;
      });
    this.setState({ apiIdListError: false });
    this.setState({ checkboxValue: temparray });
    if (this.state.editFlag) {
      this.setState({ editCheck: true });
    }
  };

  addModules = (e, flag) => {
    let { editStatus } = this.state;
    let tempArray = [];
    let submitArray = [];
    let { editServiceFlag } = this.state;
    let serviceData = this.state.packageData;
    if (this.state.serviceName === '') {
      this.setState({ serviceNameError: true });
      this.setState({ serviceNameErrorMessage: 'ServiceName is required' });
    } else if (this.state.version === '') {
      this.setState({ versionError: true });
      this.setState({ versionErrorMessage: 'Version is required' });
    } else if (this.state.cost === '') {
      this.setState({ costError: true });
      this.setState({ costErrorMessage: 'Cost is required' });
    } else if (this.state.requestCount === '') {
      this.setState({ requestCountError: true });
      this.setState({ requestCountErrorMessage: 'RequestCount is required' });
    } else if (
      this.state.checkboxValue === 'undefined' ||
      this.state.checkboxValue.length === 0
    ) {
      this.setState({ apiIdListError: true });
    } else {
      if (this.state.editFlag) {
        editServiceFlag = true;
        this.setState({ editServiceFlag });
        let x = serviceData.services.some(
          (obj) => obj.moduleId === this.state.moduleId,
        );
        if (x) {
          serviceData.services.map((data) => {
            if (data.serviceId === this.state.serviceName) {
              this.setState({ statusFlag: true });
              tempArray.push({
                id: data.id,
                moduleId: data.moduleId,
                serviceId: data.serviceId,
                serviceName: data.serviceName,
                cost:
                  typeof this.state.cost === 'string'
                    ? this.state.cost.substring(0, 1) === '$'
                      ? this.state.cost.slice(1)
                      : this.state.cost
                    : this.state.cost,
                requestsCount: this.state.requestCountValue,
                serviceVersionId: data.serviceVersionId,
                ...this.formating(data.serviceVersionId, data.serviceId),
              });
            }
            if (editStatus) {
              tempArray.push({
                moduleId: data.moduleId,
                serviceId: this.state.serviceName,
                serviceName: this.state.tempServiceName,
                cost:
                  typeof this.state.cost === 'string'
                    ? this.state.cost.substring(0, 1) === '$'
                      ? this.state.cost.slice(1)
                      : this.state.cost
                    : this.state.cost,
                requestsCount: this.state.requestCountValue,
                serviceVersionId: this.state.version,
                apis: this.state.checkboxValue.map((data) => {
                  return {
                    apiId: data,
                  };
                }),
              });
              editStatus = false;
              this.setState({ editStatus });
            }
            return null;
          });
        } else {
          tempArray.push({
            moduleId: this.state.moduleId,
            serviceId: this.state.serviceName,
            serviceName: this.state.tempServiceName,
            cost:
              typeof this.state.cost === 'string'
                ? this.state.cost.substring(0, 1) === '$'
                  ? this.state.cost.slice(1)
                  : this.state.cost
                : this.state.cost,
            requestsCount: this.state.requestCountValue,
            serviceVersionId: this.state.version,
            apis: this.state.checkboxValue.map((data) => {
              return {
                apiId: data,
              };
            }),
          });
        }
        this.setState({ getApiByVersionStauts: false });
        this.setState({ editCheck: false });
        submitArray = [...this.state.services, ...tempArray];
        const active = this.state.editPackages.filter(
          (a) => !submitArray.some((s) => s.id === a.id),
        );
        this.setState({ editPackages: [...active, ...submitArray] });
      } else {
        let tempValue = {
          moduleId: this.state.moduleId,
          serviceId: this.state.serviceName,
          versionId: this.state.version,
          cost:
            typeof this.state.cost === 'string'
              ? this.state.cost.substring(0, 1) === '$'
                ? this.state.cost.slice(1)
                : this.state.cost
              : this.state.cost,
          requestsCount: this.state.requestCountValue,
          serviceVersionId: this.state.version,
          apis: this.state.checkboxValue.map((data) => {
            return {
              apiId: data,
            };
          }),
        };
        tempArray.push(tempValue);
        submitArray = tempArray;
      }
      this.setState({ flag: false });
      // this.setState({ moduleId: '' });
      this.setState({ services: [...this.state.services, ...tempArray] });

      this.setState({ moduleFlag: true });
      if (flag && !this.state.editFlag) {
        this.submit(submitArray);
      }
      if (flag && this.state.editFlag) {
        this.submit(submitArray, this.state.moduleId, editServiceFlag);
      }
      this.props.setServicesByModule();
      this.setState({ serviceNameError: false });
      this.setState({ versionError: false });
      this.setState({ costError: false });
      this.setState({ requestCountError: false });
      this.setState({ getServiceByModuleIdList: [] });
      this.setState({ version: '' });
      this.setState({ serviceName: '' });
      this.setState({ rowsCustomplan: [] });
      this.setState({ requestCount: '' });
      this.setState({ cost: '' });
      this.setState({ getApiByVersionStauts: true });
      this.setState({ getServiceApi: true });
      this.setState({ getVersionApi: true });
      this.props.setrequestCountACtion();
      this.setState({ requestCountList: [] });
      this.setState({ requestCountApi: false });
      this.setState({ tempRequestCount: '' });
      this.setState({ tempServiceName: '' });
    }
  };
  submit = (data, x, editServiceFlag) => {
    let requestObj;
    let finalData = [];
    let finalValue = { ...this.state.packageData };
    if (this.state.editFlag) {
      if (this.state.removeFlag) {
        if (data.length > 0) {
          const inactive = [...this.state.removedModule].map((item) => ({
            ...item,
            status: 'inactive',
            apis: item.apis.map((s) => ({ ...s, status: 'inactive' })),
          }));
          const active = data.filter(
            (a) => !inactive.some((s) => s.id === a.id),
          );

          const available = finalValue.services.filter(
            (a) =>
              !active.some((s) => s.id === a.id) &&
              !inactive.some((s) => s.id === a.id),
          );
          finalData = [...inactive, ...active, ...available];
        } else {
          const inactive = [...this.state.removedModule].map((item) => ({
            ...item,
            status: 'inactive',
            apis: item.apis.map((s) => ({ ...s, status: 'inactive' })),
          }));
          const active = finalValue.services.filter(
            (a) => !inactive.some((s) => s.id === a.id),
          );
          finalData = [...inactive, ...active];
        }
      } else if (editServiceFlag) {
        const available = finalValue.services.filter(
          (obj) => !data.some((obj2) => obj.id === obj2.id),
        );
        finalData = [...data, ...available];
      }
      requestObj = {
        packageId: this.state.packageId,
        packageName: this.state.packageName,
        packageType: this.state.packageType,
        packageDescription: this.state.packageDescription,
        services: finalData.map((item) => {
          return item.status
            ? {
                id: item.id,
                serviceId: item.serviceId,
                cost:
                  typeof item.cost === 'string'
                    ? item.cost.substring(0, 1) === '$'
                      ? item.cost.slice(1)
                      : item.cost
                    : item.cost,
                serviceVersionId: item.serviceVersionId,
                apis: item.apis.map((data) => {
                  if (data.status)
                    return {
                      apiId: data.apiId,
                      id: data.id,
                      status: data.status,
                    };
                  else
                    return {
                      apiId: data.apiId,
                    };
                }),
                status: item.status,
              }
            : {
                serviceId: item.serviceId,
                cost:
                  typeof item.cost === 'string'
                    ? item.cost.substring(0, 1) === '$'
                      ? item.cost.slice(1)
                      : item.cost
                    : item.cost,
                requestsCount: item.requestsCount,
                serviceVersionId: item.serviceVersionId,
                apis: item.apis,
              };
        }),
      };
      this.setState({ editCheck: false });
      this.setState({ putData: requestObj });
      this.setState({ confirmFlag: true });
      this.setState({ flag: false });
    } else {
      requestObj = {
        packageName: this.state.packageName,
        packageType: this.state.packageType,
        packageDescription: this.state.packageDescription,
        isAdmin: this.state.isAdmin,
        services: data,
      };
      this.setState({ postData: requestObj });
      this.setState({ confirmFlag: true });
      this.setState({ flag: false });
    }
    this.props.setrequestCountACtion();
    this.setState({ requestCountList: [] });
    this.setState({ requestCountApi: false });
  };
  createPackage = () => {
    let requestObj;
    let finalData = [];
    if (this.state.editFlag) {
      let finalValue = { ...this.state.packageData };
      if (this.state.removeFlag) {
        if (this.state.services.length > 0) {
          const inactive = [...this.state.removedModule].map((item) => ({
            ...item,
            status: 'inactive',
            apis: item.apis.map((s) => ({ ...s, status: 'inactive' })),
          }));
          const active = this.state.services.filter(
            (a) => !inactive.some((s) => s.id === a.id),
          );

          const available = finalValue.services.filter(
            (a) =>
              !active.some((s) => s.id === a.id) &&
              !inactive.some((s) => s.id === a.id),
          );
          finalData = [...inactive, ...active, ...available];
        } else {
          const inactive = [...this.state.removedModule].map((item) => ({
            ...item,
            status: 'inactive',
            apis: item.apis.map((s) => ({ ...s, status: 'inactive' })),
          }));
          const active = finalValue.services.filter(
            (a) => !inactive.some((s) => s.id === a.id),
          );
          finalData = [...inactive, ...active];
        }
      } else if (this.state.editServiceFlag) {
        const available = finalValue.services.filter(
          (obj) => !this.state.services.some((obj2) => obj.id === obj2.id),
        );
        finalData = [...this.state.services, ...available];
      }
      requestObj = {
        packageId: this.state.packageId,
        packageDescription: this.state.packageDescription,
        packageName: this.state.packageName,
        packageType: this.state.packageType,
        services: finalData.map((item) => {
          return item.status
            ? {
                id: item.id,
                serviceId: item.serviceId,
                cost:
                  typeof item.cost === 'string'
                    ? item.cost.substring(0, 1) === '$'
                      ? item.cost.slice(1)
                      : item.cost
                    : item.cost,
                requestsCount: item.requestsCount,
                serviceVersionId: item.serviceVersionId,
                apis: item.apis.map((data) => {
                  if (data.status)
                    return {
                      apiId: data.apiId,
                      id: data.id,
                      status: data.status,
                    };
                  else
                    return {
                      apiId: data.apiId,
                    };
                }),
                status: item.status,
              }
            : {
                serviceId: item.serviceId,
                cost:
                  typeof item.cost === 'string'
                    ? item.cost.substring(0, 1) === '$'
                      ? item.cost.slice(1)
                      : item.cost
                    : item.cost,
                requestsCount: item.requestsCount,
                serviceVersionId: item.serviceVersionId,
                apis: item.apis,
              };
        }),
      };
      this.setState({ putData: requestObj });
      this.setState({ confirmFlag: true });
      this.setState({ flag: false });
    } else {
      requestObj = {
        packageName: this.state.packageName,
        packageType: this.state.packageType,
        packageDescription: this.state.packageDescription,
        isAdmin: this.state.isAdmin,
        services: this.state.services,
      };
      this.setState({ postData: requestObj });
      this.setState({ confirmFlag: true });
      this.setState({ flag: false });
    }
    this.props.setPackageDataById();
  };
  cancel = () => {
    this.props.setPackageDataById();
    this.props.history.push('/availablePackage');
  };
  handleClose = () => {
    this.setState({ open: false });
    if (this.state.apiMessageStatus) {
      this.setState({ apiMessageStatus: false });
    }
  };
  onCancel = () => {
    this.setState({ confirmFlag: false });
  };
  onConfirm = () => {
    if (this.state.editFlag) {
      this.props.updatePackage(this.state.putData);
    } else {
      this.props.postPackage(this.state.postData);
    }
  };
  onClickServices = (val, data) => {
    if (this.state.editFlag) {
      this.state.packageData.services.map((item) => {
        if (!val && item.serviceId === data.serviceId) {
          this.setState({ flag: true });
          this.props.requestCountData(
            localStorage.getItem('partner_id'),
            data.moduleId,
          );
          this.setState({ getServiceApi: true });
          this.props.getServicesBymodules(data.moduleId);
          this.setState({ getVersionApi: true });
          // this.props.getVersionsByService(data.serviceId);
          this.setState({ serviceName: data.serviceId });
          this.setState({ version: data.serviceVersionId });
          this.setState({ cost: data.cost });
          this.setState({ getRequestCount: true });
          this.setState({ tempRequestCount: data.requestsCount });
          this.setState({ apiData: data.apis });
          this.setState({ getApiByVersion: true });
          this.setState({ requestCountApi: true });
          // this.props.getApiListByVersion(data.serviceVersionId);
        } else if (val) {
          this.setState({ editStatus: true });
          // this.setState({ requestCountValue: '' });
          this.setState({ flag: true });
          this.setState({ getServiceApi: true });
          this.props.getServicesBymodules(item.moduleId);
          this.props.requestCountData(
            localStorage.getItem('partner_id'),
            item.moduleId,
          );
          this.setState({ requestCountApi: true });
        }
        return null;
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <MainScreen logoutEnable={true} label={'Logout'}>
        <SubWrapper>
          <Container>
            <CustomText
              color="#ffff"
              fontSize="30px"
              fontWeight={200}
              className={classes.title}
            >
              Available Modules
            </CustomText>
            <CardDiv>
              {this.state.moduleList.map((data, idx) => (
                <CustomPlanCard
                  select={
                    !this.state.editFlag
                      ? this.state.services.some(
                          (o) => o.moduleId === data.moduleId,
                        )
                      : this.state.modulesList.some(
                          (o) => o.moduleId === data.moduleId,
                        ) ||
                        this.state.services.some(
                          (o) => o.moduleId === data.moduleId,
                        )
                  }
                  label={data.moduleName}
                  onClick={() => this.onClick(data.moduleId, data.moduleName)}
                  key={idx.toString()}
                  image={data.moduleIcon}
                  imgFlag
                />
              ))}
            </CardDiv>
            {this.state.editFlag && this.state.tempFlag ? (
              <div style={{ marginTop: '10px' }}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  marginBottom="20px"
                  style={{ gap: '30px' }}
                >
                  <CustomText
                    color={'#ffffff'}
                    fontWeight={800}
                    fontSize={'20px'}
                  >
                    {this.state.tempModuleName + ' : '}
                  </CustomText>
                  <ButtonComponent
                    backgroundColor={'white'}
                    hoverColor={'white'}
                    labelColor={'#0898be'}
                    fontSize={'18px'}
                    onClick={() => this.onClickServices(true, '')}
                    className={classes.button}
                  >
                    Choose More services
                  </ButtonComponent>
                </Box>
                <CustomText
                  color={'#ffffff'}
                  fontWeight={800}
                  fontSize={'20px'}
                >
                  Selected Services
                </CustomText>
                {Object.keys(this.state.editPackages).length > 0 &&
                  this.state.editPackages.map((data) => {
                    if (this.state.tempModuleId === data.moduleId) {
                      return (
                        <Box
                          display="flex"
                          flexDirection="row"
                          marginTop="10px"
                          width="18%"
                          justifyContent="space-between"
                          onClick={() => this.onClickServices(false, data)}
                        >
                          <CustomText color={'#ffffff'} fontSize={'15px'}>
                            {data.serviceName}
                          </CustomText>
                          {data.status === 'active' ? (
                            <img
                              src={editIcon}
                              alt={editIcon}
                              style={{
                                width: '18px',
                                height: '18px',
                                marginLeft: '20px',
                              }}
                            />
                          ) : data.status === 'inactive' ? (
                            <img
                              src={inactiveIcon}
                              alt={inactiveIcon}
                              style={{
                                width: '18px',
                                height: '18px',
                                marginLeft: '20px',
                              }}
                            />
                          ) : (
                            ''
                          )}
                        </Box>
                      );
                    }
                    return null;
                  })}
              </div>
            ) : (
              ''
            )}
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <ButtonComponent
                className={classes.button}
                height={'40.1px'}
                width={'140px'}
                fontSize={'18px'}
                backgroundColor={'white'}
                hoverColor={'white'}
                labelColor={'#0898be'}
                disabled={false}
                onClick={this.cancel}
              >
                Cancel
              </ButtonComponent>
              <ButtonComponent
                height={'40.1px'}
                width={'140px'}
                fontSize={'18px'}
                backgroundColor={
                  this.state.moduleFlag || this.state.editFlag
                    ? 'white'
                    : '#808080'
                }
                hoverColor={'white'}
                labelColor={
                  this.state.moduleFlag || this.state.editFlag
                    ? '#0898be'
                    : '#ffff'
                }
                disabled={
                  this.state.moduleFlag || this.state.editFlag ? false : true
                }
                onClick={
                  this.state.moduleFlag || this.state.editFlag
                    ? this.createPackage
                    : ''
                }
              >
                {this.state.editFlag ? 'Update Pacakge' : 'Create package'}
              </ButtonComponent>
            </Box>
          </Container>
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
          {this.state.apiMessageStatus ? (
            <SnackBarComponent
              open={this.state.apiMessageStatus}
              onClose={this.handleClose}
              message={this.state.apiMessage}
              iconclose={this.handleClose}
            />
          ) : (
            ''
          )}
          {this.state.confirmFlag && (
            <ModalUi
              title={
                this.state.editFlag ? 'Package Update' : 'Package Creation'
              }
              isOpen={this.state.confirmFlag}
              secondaryText="No"
              onClose={(event) => this.onCancel(event)}
              onPrimaryClick={(e, _flag) => this.onConfirm(e)}
              primaryText="Confirm"
            >
              {this.state.editFlag ? (
                <CustomText color="#4b485e">
                  Updating Pacakge - <b>{this.state.packageName}</b>
                </CustomText>
              ) : (
                <CustomText color="#4b485e">
                  Creating Custom Package - <b>{this.state.packageName}</b>
                </CustomText>
              )}
            </ModalUi>
          )}
          <ModalUi
            title={this.state.title}
            isOpen={this.state.flag}
            secondaryText="No"
            onClose={(event) => this.onNo(event)}
            onPrimaryClick={(e, _flag) => this.addModules(e, false)}
            primaryText="Add Modules"
            tertiary="Submit"
            onTertiaryClick={(e, _flag) => this.addModules(e, true)}
            editFlag={this.state.editFlag}
            fourth="Remove"
            onRemoveClick={(e, _flag) => this.removeModule(e)}
          >
            <Box className={classes.root}>
              <DropDown
                width="250px"
                label="Service*"
                backgroundColor="1.5px solid #0279a8"
                iconColor="#0279a8"
                labelColor="#4b485e"
                dropdownOption={this.state.getServiceByModuleIdList}
                onChange={this.dropDownOnchangeFun}
                value={this.state.serviceName}
                error={this.state.serviceNameError}
                helperText={this.state.serviceNameErrorMessage}
              />
              <DropDown
                width="250px"
                label="Version*"
                backgroundColor="1.5px solid #0279a8"
                iconColor="#0279a8"
                labelColor="#4b485e"
                dropdownOption={this.state.versionByServiceList}
                onChange={this.dropDownOnchangeversionFun}
                value={this.state.version}
                error={this.state.versionError}
                helperText={this.state.versionErrorMessage}
              />
            </Box>
            <Box className={classes.root}>
              <DropDown
                width="250px"
                label="Request Count*"
                backgroundColor="1.5px solid #0279a8"
                iconColor="#0279a8"
                labelColor="#4b485e"
                dropdownOption={this.state.requestCountList}
                onChange={this.dropDownOnchangeRequestCount}
                value={
                  this.state.requestCount !== undefined
                    ? this.state.requestCount
                    : ''
                }
                error={this.state.requestCountError}
                helperText={this.state.requestCountErrorMessage}
              />
              <CustomText
                color="#4b485e"
                fontSize={'18px'}
                className={classes.cost}
              >
                Cost :{this.state.cost}
              </CustomText>
            </Box>
            {this.state.apiIdListError ? (
              <CustomText color="red" fontSize={'13px'}>
                Select the api
              </CustomText>
            ) : (
              ''
            )}
            <EnhancedTable
              headCells={headCellsCustomplan}
              rows={this.state.rowsCustomplan}
              edit={this.state.editFlag}
              checkBoxValue={this.state.checkboxValue}
              // eslint-disable-next-line no-console
              onClick={(val) => this.checkboxOnchange(val)}
            />
          </ModalUi>
          {this.props.getModuleDetailsInfo && this.props.getModuleDetailsInfo
            ? this.getmoduleInfo()
            : ''}
          {/* {this.props.getServiceByModuleId && this.props.getServiceByModuleId
            ? this.getServicesByModuleInfo()
            : ''} */}
          {this.props.getVersionsByServiceId &&
          this.props.getVersionsByServiceId
            ? this.getVersionByServiceInfo()
            : ''}
          {this.props.getApiDetailsInfo && this.props.getApiDetailsInfo
            ? this.getApiList()
            : ''}
          {this.props.getPackageDataByIdInfo &&
          this.props.getPackageDataByIdInfo
            ? this.getPackageDataByID()
            : ''}
          {this.props.getRequestCountInfo && this.props.getRequestCountInfo
            ? this.getRequestCount()
            : ''}
          {this.props.createPackageDeatails && this.props.createPackageDeatails
            ? this.createpackageDeatilsInfo()
            : ''}
          {this.props.updatePackageInfo && this.props.updatePackageInfo
            ? this.updatepackageDeatilsInfo()
            : ''}
        </SubWrapper>
      </MainScreen>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getModuleDetailsInfo: state.getModuleDetails,
    getServiceByModuleId: state.getServicesBymodules,
    getVersionsByServiceId: state.getVersionsByService,
    getApiDetailsInfo: state.getApiListByVersion,
    getPackageDataByIdInfo: state.getPackageDataById,
    getRequestCountInfo: state.requestCountData,
    createPackageDeatails: state.postPackage,
    updatePackageInfo: state.updatePackage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getModuleDetails: () => dispatch(getModuleDetails()),
    setGetModuleDetails: () => dispatch(setGetModuleDetails()),
    getServicesBymodules: (x) => dispatch(getServicesBymodules(x)),
    setServicesByModule: () => dispatch(setServicesByModule()),
    getVersionsByService: () => dispatch(getVersionsByService()),
    setVersionsByService: () => dispatch(setVersionsByService()),
    getApiListByVersion: (x, y) => dispatch(getApiListByVersion(x, y)),
    setApiListByVersion: () => dispatch(setApiListByVersion()),
    postPackage: (x) => dispatch(postPackage(x)),
    getPackageDataById: (x) => dispatch(getPackageDataById(x)),
    setPackageDataById: () => dispatch(setPackageDataById()),
    updatePackage: (x) => dispatch(updatePackage(x)),
    requestCountData: (x, y) => dispatch(requestCountData(x, y)),
    setPostPackage: () => dispatch(setPostPackage()),
    setPutPackageData: () => dispatch(setPutPackageData()),
    setrequestCountACtion: () => dispatch(setrequestCountACtion()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles),
)(CustomPlan);
