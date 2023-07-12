import client from '../../config';
import { GET_ALL_PACKAGES } from '../../apis';
import { GET_ALLPACKAGES_TYPE } from '../../types';

export const getAllPackages = () => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(`${GET_ALL_PACKAGES}`, {
        headers: {
          ...headers,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_ALLPACKAGES_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ALLPACKAGES_TYPE,
          data: { status: 'AccessToken  Error' },
        });
      });
  };
};

export const setPackages = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_ALLPACKAGES_TYPE,
      data: {},
    });
  };
};
