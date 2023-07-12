import client from '../../config';
import { GET_SERVICES_API } from '../../apis';
import { GET_SERVICES_TYPE } from '../../types';

const headers = {
  token: localStorage.getItem('token'),
  authToken: localStorage.getItem('authToken'),
};
export const getServicesByModule = (moduleId) => {
  return async (dispatch) => {
    return client()
      .get(`${GET_SERVICES_API}${moduleId}`, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: GET_SERVICES_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_SERVICES_TYPE,
          data: { status: 'error' },
        });
      });
  };
};
export const setServicesByModule = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_SERVICES_TYPE,
      data: {
        message: undefined,
      },
    });
  };
};
