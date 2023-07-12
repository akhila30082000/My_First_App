import { GET_ALLPACKAGES_TYPE } from '../../types';

const getAllPackagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALLPACKAGES_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default getAllPackagesReducer;
