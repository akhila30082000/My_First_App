import { CUSTOMER_SIGNUP } from '../../types';

const postCustomerSignup = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_SIGNUP:
      return action.data;

    default:
      return state;
  }
};
export default postCustomerSignup;
