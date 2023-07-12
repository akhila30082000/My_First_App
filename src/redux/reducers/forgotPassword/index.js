import { FORGOTPASSWORD_TYPE } from '../../types';

const forgotPassword = (state = {}, action) => {
  switch (action.type) {
    case FORGOTPASSWORD_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default forgotPassword;
