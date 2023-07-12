import client from '../../config';
import { GET_SERVICES_API_By_Module } from '../../apis';
import { GET_SERVICES_By_MODULE } from '../../types';

export const getServicesBymodules = (moduleId) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(`${GET_SERVICES_API_By_Module}${moduleId}`, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: GET_SERVICES_By_MODULE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_SERVICES_By_MODULE,
          data: { status: 'error' },
        });
      });
  };
};
export const setServicesByModule = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_SERVICES_By_MODULE,
      data: {
        message: undefined,
      },
    });
  };
};
