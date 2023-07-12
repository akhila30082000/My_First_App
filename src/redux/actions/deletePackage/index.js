import client from '../../config';
import { DELETE_PACKAGE_BY_ID_API } from '../../apis';
import { DELETE_PACKAGE_BY_ID_TYPE } from '../../types';

export const deletePackageById = (id) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  };
  return async (dispatch) => {
    return client()
      .post(
        `${DELETE_PACKAGE_BY_ID_API}?packageId=${id}&status=inactive`,
        {},
        {
          headers: {
            ...headers,
          },
        },
      )
      .then((res) => {
        dispatch({
          type: DELETE_PACKAGE_BY_ID_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: DELETE_PACKAGE_BY_ID_TYPE,
          data: { data: { status: 'error' } },
        });
      });
  };
};

export const setDeletePackageById = () => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_PACKAGE_BY_ID_TYPE,
      data: null,
    });
  };
};
