import { GET_PURCHASED_PACKAGES_TYPE } from '../../types';

const getAllPurchasedPackagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PURCHASED_PACKAGES_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default getAllPurchasedPackagesReducer;
