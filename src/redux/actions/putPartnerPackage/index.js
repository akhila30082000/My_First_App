import client from '../../config';
import { PUT_PARTNER_PACKAGE } from '../../apis';
import { PUT_PARTNER_PACKAGE_TYPE } from '../../types';

const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
};
export const putPartnerPackage = (data) => {
  return async (dispatch) => {
    return client()
      .put(`${PUT_PARTNER_PACKAGE}`, data, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: PUT_PARTNER_PACKAGE_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: PUT_PARTNER_PACKAGE_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setPutPartnerPackage = () => {
  return async (dispatch) => {
    dispatch({
      type: PUT_PARTNER_PACKAGE_TYPE,
      data: {},
    });
  };
};
