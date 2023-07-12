import client from '../../config';
import { GETCLIENT_API } from '../../apis';
import { GETCLIENT_TYPE } from '../../types';

export const getClientDetails = () => {
  return async (dispatch) => {
    return client()
      .get(`${GETCLIENT_API}`)
      .then((res) => {
        dispatch({
          type: GETCLIENT_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GETCLIENT_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setgetClientDetails = () => {
  return async (dispatch) => {
    dispatch({
      type: GETCLIENT_TYPE,
      data: {},
    });
  };
};
