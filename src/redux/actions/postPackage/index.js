import client from '../../config';
import { ADD_PACKAGE_API } from '../../apis';
import { ADD_PACKAGE_TYPE } from '../../types';

export const postPackage = (data) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .post(`${ADD_PACKAGE_API}`, data, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: ADD_PACKAGE_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: ADD_PACKAGE_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setPostPackage = () => {
  return async (dispatch) => {
    dispatch({
      type: ADD_PACKAGE_TYPE,
      data: {},
    });
  };
};
