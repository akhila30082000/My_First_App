import { baseUrl } from '../config';

export const LOGIN_API = `${baseUrl}login`;

export const Access_API = `${baseUrl}generateToken`;

export const SIGNUP_API = `${baseUrl}`;

export const GETCLIENT_API = `${baseUrl}getAllClientNames`;

export const GET_ENV_DETAILS_API = `${baseUrl}getAllEnvironments`;

export const GET_MODULE_API = `${baseUrl}modules`;

export const GET_SERVICES_API_By_Module = `${baseUrl}services/`;

export const GET_VERSIONS_By_SERVICE = `${baseUrl}versions`;

export const GET_API_LIST_BY_VERSION = `${baseUrl}apis/`;

export const GET_ALL_PACKAGES = `${baseUrl}packages`;

export const GET_PACKAGE_BY_ID_API = `${baseUrl}packages/`;

export const ADD_PACKAGE_API = `${baseUrl}packages`;

export const ADD_PAYMENT_API = `${baseUrl}purchasePackage`;

export const CUSTOMER_SIGNUP_API = `${baseUrl}customer/signup`;

export const PUT_PACKAGE_API = `${baseUrl}packages`;

export const REQUEST_COUNT_API = `${baseUrl}pricingrule`;

export const GET_HISTORY = `${baseUrl}packages/transactions`;

export const DELETE_PACKAGE_BY_ID_API = `${baseUrl}packages/delete/`;

export const GET_PURCASED_PACKAGES = `${baseUrl}packages/purchased`;

export const LOGOUT_API = `${baseUrl}customer/logout`;

export const GET_SIGNUP_API = `${baseUrl}signUp/`;

export const GET_ALL_PARTNERS = `${baseUrl}getPartnersByClient/`;

export const PUT_PARTNER_PACKAGE = `${baseUrl}shareServices`;

export const ONBOARD_PARTNER = `${baseUrl}onboardPartner`;

export const GET_TENANT_API = `${baseUrl}tenantInfo`;

export const FORGOTPASSWORD_API = `${baseUrl}forgotPassword`;
