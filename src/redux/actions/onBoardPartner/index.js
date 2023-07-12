import client from '../../config';
import { ONBOARD_PARTNER } from '../../apis';
import { ONBOARD_PARTNER_TYPE } from '../../types';

export const onBoardPartner = (data) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .post(`${ONBOARD_PARTNER}`, data, {
        headers: { ...headers },
      })
      .then((res) => {
        dispatch({
          type: ONBOARD_PARTNER_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: ONBOARD_PARTNER_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setOnBoardPartner = () => {
  return async (dispatch) => {
    dispatch({
      type: ONBOARD_PARTNER_TYPE,
      data: {},
    });
  };
};
