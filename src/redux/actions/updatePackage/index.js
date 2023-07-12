import client from '../../config';
import { PUT_PACKAGE_API } from '../../apis';
import { PUT_PACKAGE_TYPE } from '../../types';

export const updatePackage = (tempVal) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .put(`${PUT_PACKAGE_API}`, tempVal, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: PUT_PACKAGE_TYPE,
          data: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: PUT_PACKAGE_TYPE,
          data: { status: 'ERROR', message: 'Package Unavailable' },
        });
      });
  };
};

export const setPutPackageData = () => {
  return async (dispatch) => {
    dispatch({
      type: PUT_PACKAGE_TYPE,
      data: null,
    });
  };
};
