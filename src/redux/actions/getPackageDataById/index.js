import client from '../../config';
import { GET_PACKAGE_BY_ID_API } from '../../apis';
import { GET_PACKAGE_BY_ID } from '../../types';

export const getPackageDataById = (flag, id) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(
        `${GET_PACKAGE_BY_ID_API}${id}?isAdmin=${flag}&isClient=true&tenancyId=${localStorage.getItem(
          'partner_id',
        )}`,
        { headers: { ...headers } },
      )
      .then((res) => {
        dispatch({
          type: GET_PACKAGE_BY_ID,
          data: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_PACKAGE_BY_ID,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setPackageDataById = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_PACKAGE_BY_ID,
      data: {},
    });
  };
};
