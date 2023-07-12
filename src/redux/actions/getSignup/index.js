import client from '../../config';
import { GET_SIGNUP_API } from '../../apis';
import { GET_SIGNUP } from '../../types';

export const getSignUp = (moduleId) => {
  return async (dispatch) => {
    return client()
      .get(`${GET_SIGNUP_API}${moduleId}`, {})
      .then((res) => {
        dispatch({
          type: GET_SIGNUP,
          data: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_SIGNUP,
          data: { status: 'error' },
        });
      });
  };
};
export const setSignUp = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_SIGNUP,
      data: {
        message: undefined,
      },
    });
  };
};
