import client from '../../config';
import { ADD_PAYMENT_API } from '../../apis';
import { ADD_PAYMENT_TYPE } from '../../types';

const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
};
export const postPayment = (data) => {
  return async (dispatch) => {
    return client()
      .post(`${ADD_PAYMENT_API}`, data, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: ADD_PAYMENT_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: ADD_PAYMENT_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setPostPayment = () => {
  return async (dispatch) => {
    dispatch({
      type: ADD_PAYMENT_TYPE,
      data: {},
    });
  };
};
