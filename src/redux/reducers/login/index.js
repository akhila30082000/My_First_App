import { LOGIN_TYPE } from '../../types';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default loginReducer;
