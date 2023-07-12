import { GET_SERVICES_By_MODULE } from '../../types';

const getAllServicesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SERVICES_By_MODULE:
      return action.data;

    default:
      return state;
  }
};
export default getAllServicesReducer;
