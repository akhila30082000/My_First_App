import client from '../../config';
import { LOGOUT_API } from '../../apis';
import { LOGOUT_TYPE } from '../../types';

const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
};
export const logoutUser = () => {
  return async (dispatch) => {
    return client()
      .post(
        `${LOGOUT_API}`,
        {},
        {
          headers: { ...headers },
        },
      )
      .then((res) => {
        dispatch({
          type: LOGOUT_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setLogoutData = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT_TYPE,
      data: {},
    });
  };
};
