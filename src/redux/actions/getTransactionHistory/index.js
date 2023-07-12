import client from '../../config';
import { GET_HISTORY } from '../../apis';
import { GET_HISTORY_TYPE } from '../../types';

export const getAllHistory = () => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(`${GET_HISTORY}`, {
        headers: {
          ...headers,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_HISTORY_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_HISTORY_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};
