import client from '../../config';
import { GET_TENANT_API } from '../../apis';
import { GET_TENANT_TYPE } from '../../types';

export const getTenantInfo = (flag, id) => {
  return async (dispatch) => {
    return client()
      .get(`${GET_TENANT_API}?isClient=${flag}&tenantId=${id}`)
      .then((res) => {
        dispatch({
          type: GET_TENANT_TYPE,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_TENANT_TYPE,
          data: { status: 'error' },
        });
      });
  };
};
export const setTenantInfo = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_TENANT_TYPE,
      data: {
        message: undefined,
      },
    });
  };
};
