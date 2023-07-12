import client from '../../config';
import { REQUEST_COUNT_API } from '../../apis';
import { REQUEST_COUNT } from '../../types';

export const requestCountData = (x, y) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(`${REQUEST_COUNT_API}?partnerId=${x}&moduleId=${y}`, {
        headers: {
          ...headers,
        },
      })
      .then((res) => {
        dispatch({
          type: REQUEST_COUNT,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: REQUEST_COUNT,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setrequestCountACtion = () => {
  return async (dispatch) => {
    dispatch({
      type: REQUEST_COUNT,
      data: {},
    });
  };
};
