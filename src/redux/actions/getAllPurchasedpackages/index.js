import client from '../../config';
import { GET_PURCASED_PACKAGES } from '../../apis';
import { GET_PURCHASED_PACKAGES_TYPE } from '../../types';

export const getAllPurchasedPackages = (flag, tenancyId) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(`${GET_PURCASED_PACKAGES}?isClient=${flag}&tenancyId=${tenancyId}`, {
        headers: {
          ...headers,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_PURCHASED_PACKAGES_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_PURCHASED_PACKAGES_TYPE,
          data: { status: 'AccessToken  Error' },
        });
      });
  };
};

export const setAllPackages = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_PURCHASED_PACKAGES_TYPE,
      data: {},
    });
  };
};
