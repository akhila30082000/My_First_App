import { ADD_PAYMENT_TYPE } from '../../types';

const postPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PAYMENT_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default postPaymentReducer;
