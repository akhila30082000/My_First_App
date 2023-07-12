import client from '../../config';
import { GET_ENV_DETAILS_API } from '../../apis';
import { GET_ENV_DETAILS_TYPE } from '../../types';
const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
};
export const getEnvironmentDetails = () => {
  return async (dispatch) => {
    return client()
      .get(`${GET_ENV_DETAILS_API}`, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: GET_ENV_DETAILS_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ENV_DETAILS_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setgetEnvironmentDetails = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_ENV_DETAILS_TYPE,
      data: {},
    });
  };
};
