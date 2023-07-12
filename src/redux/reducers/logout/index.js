import { LOGOUT_TYPE } from '../../types';

const logoutUser = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default logoutUser;
