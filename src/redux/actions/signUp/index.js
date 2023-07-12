import client from '../../config';
import { SIGNUP_API } from '../../apis';
import { SIGNUP_TYPE } from '../../types';

export const signUp = (type, data) => {
  return async (dispatch) => {
    return client()
      .post(`${SIGNUP_API}${type}/signup`, data)
      .then((res) => {
        dispatch({
          type: SIGNUP_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: SIGNUP_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setSignUp = () => {
  return async (dispatch) => {
    dispatch({
      type: SIGNUP_TYPE,
      data: {},
    });
  };
};
