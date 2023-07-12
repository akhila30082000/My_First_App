import client from '../../config';
import { GET_VERSIONS_By_SERVICE } from '../../apis';
import { GET_VERSIONS_SERVICE } from '../../types';

export const getVersionsByService = () => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(`${GET_VERSIONS_By_SERVICE}`, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: GET_VERSIONS_SERVICE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_VERSIONS_SERVICE,
          data: { status: 'error' },
        });
      });
  };
};
export const setVersionsByService = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_VERSIONS_SERVICE,
      data: {
        message: undefined,
      },
    });
  };
};
