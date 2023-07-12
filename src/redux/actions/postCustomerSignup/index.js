import client from '../../config';
import { CUSTOMER_SIGNUP_API } from '../../apis';
import { CUSTOMER_SIGNUP } from '../../types';

export const postCustomerSignup = (data, tenancyID) => {
  const headers = {
    tenancyId: tenancyID,
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .post(`${CUSTOMER_SIGNUP_API}`, data, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: CUSTOMER_SIGNUP,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: CUSTOMER_SIGNUP,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setCustomerSignup = () => {
  return async (dispatch) => {
    dispatch({
      type: CUSTOMER_SIGNUP,
      data: {},
    });
  };
};
