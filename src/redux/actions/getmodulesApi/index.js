import client from '../../config';
import { GET_MODULE_API } from '../../apis';
import { GET_MODULE_TYPE } from '../../types';

export const getModuleDetails = () => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(`${GET_MODULE_API}`, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: GET_MODULE_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_MODULE_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setGetModuleDetails = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_MODULE_TYPE,
      data: {},
    });
  };
};
