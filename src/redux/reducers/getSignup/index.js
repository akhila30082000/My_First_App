import { GET_SIGNUP } from '../../types';

const getSignUp = (state = {}, action) => {
  switch (action.type) {
    case GET_SIGNUP:
      return action.data;

    default:
      return state;
  }
};
export default getSignUp;
