import client from '../../config';
import { GET_ALL_PARTNERS } from '../../apis';
import { GET_ALLPARTNERS_TYPE } from '../../types';

export const getAllPartnersByClient = () => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(`${GET_ALL_PARTNERS}${localStorage.getItem('partner_id')}`, {
        headers: {
          ...headers,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_ALLPARTNERS_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ALLPARTNERS_TYPE,
          data: { status: 'AccessToken  Error' },
        });
      });
  };
};

export const setAllPartnersByClient = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_ALLPARTNERS_TYPE,
      data: {},
    });
  };
};
