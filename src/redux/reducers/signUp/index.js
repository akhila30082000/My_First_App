import { SIGNUP_TYPE } from '../../types';

const signUpReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default signUpReducer;
