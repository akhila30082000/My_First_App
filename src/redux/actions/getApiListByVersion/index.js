import client from '../../config';
import { GET_API_LIST_BY_VERSION } from '../../apis';
import { GET_APILIST_BYVERSION } from '../../types';

export const getApiListByVersion = (service, version) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .get(
        `${GET_API_LIST_BY_VERSION}` +
          '?serviceId=' +
          `${service}` +
          '&' +
          'versionId=' +
          `${version}`,
        {
          headers: {
            ...headers,
          },
        },
      )
      .then((res) => {
        dispatch({
          type: GET_APILIST_BYVERSION,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_APILIST_BYVERSION,
          data: { status: 'error' },
        });
      });
  };
};
export const setApiListByVersion = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_APILIST_BYVERSION,
      data: {
        message: undefined,
      },
    });
  };
};
