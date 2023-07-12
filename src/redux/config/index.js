import axios from 'axios';

// export const baseUrl = 'http://192.168.1.71:8080/csmart-dx-validation/';
export const baseUrl = process.env.REACT_APP_APIURL;
// export const baseUrl = process.env.REACT_APP_LOCALURL;

const configUrl = () => {
  return axios.create({
    baseURL: baseUrl,
  });
};
export default configUrl;
