import client from '../../config';
import { LOGIN_API } from '../../apis';
import { LOGIN_TYPE } from '../../types';

const headers = {
  type: 'partner',
};
export const loginUser = (data) => {
  return async (dispatch) => {
    return client()
      .post(`${LOGIN_API}`, data)
      .then((res) => {
        dispatch({
          type: LOGIN_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setLoginData = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_TYPE,
      data: {},
    });
  };
};
