import { combineReducers } from 'redux';
import login from './login';
import generateAccessToken from './generateAccessToken';
import signup from './signUp';
import getClientDetails from './getClientDetails';
import getEnvironmentDetails from './getEnvironmentDetails';
import getModuleDetails from './getmoduleAPi';
import getServicesBymodules from './getservicesBymodule';
import getVersionsByService from './getversionsByService';
import getApiListByVersion from './getApiListByVersion';
import getAllPackages from './getAllPackages';
import getPackageDataById from './getPackageDataById';
import postPackage from './postPackage';
import postPayment from './postPayment';
import postCustomerSignup from './postCustomerSignup';
import updatePackage from './updatePackage';
import requestCountData from './requestCountReducer';
import getAllHistory from './getAllHistoryReducer';
import deletePackageById from './deletePackageReducer';
import getAllPurchasedPackages from './getAllPurchasedPackages';
import logoutUser from './logout';
import getSignUp from './getSignup';
import getAllPartnersByClient from './getAllPartnersByClientReducer';
import putPartnerPackage from './putPartnerPackage';
import onBoardPartner from './onBoardPartner';
import getTenantInfo from './getTenantInfo';
import forgotPassword from './forgotPassword';

export const appReducer = combineReducers({
  login,
  generateAccessToken,
  signup,
  getClientDetails,
  getEnvironmentDetails,
  getModuleDetails,
  getServicesBymodules,
  getVersionsByService,
  getApiListByVersion,
  getAllPackages,
  getPackageDataById,
  postPackage,
  postPayment,
  postCustomerSignup,
  updatePackage,
  requestCountData,
  getAllHistory,
  deletePackageById,
  getAllPurchasedPackages,
  logoutUser,
  getSignUp,
  getAllPartnersByClient,
  putPartnerPackage,
  onBoardPartner,
  getTenantInfo,
  forgotPassword,
});
