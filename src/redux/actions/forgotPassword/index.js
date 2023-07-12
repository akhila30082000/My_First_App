import client from '../../config';
import { FORGOTPASSWORD_API } from '../../apis';
import { FORGOTPASSWORD_TYPE } from '../../types';

export const forgotPassword = (type, data) => {
  return async (dispatch) => {
    return client()
      .post(`${FORGOTPASSWORD_API}?requestType=${type}`, data)
      .then((res) => {
        dispatch({
          type: FORGOTPASSWORD_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: FORGOTPASSWORD_TYPE,
          data: { status: 'AccessToken  Error' },
        });
      });
  };
};

export const setForgotPassword = () => {
  return async (dispatch) => {
    dispatch({
      type: FORGOTPASSWORD_TYPE,
      data: {},
    });
  };
};
