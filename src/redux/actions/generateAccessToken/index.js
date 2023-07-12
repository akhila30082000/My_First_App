import client from '../../config';
import { Access_API } from '../../apis';
import { Access_Type } from '../../types';

const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
};
export const generateAccessToken = (data) => {
  return async (dispatch) => {
    return client()
      .post(`${Access_API}`, data, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: Access_Type,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: Access_Type,
          data: { status: 'AccessToken  Error' },
        });
      });
  };
};

export const setGenerateAccessToken = () => {
  return async (dispatch) => {
    dispatch({
      type: Access_Type,
      data: {},
    });
  };
};
