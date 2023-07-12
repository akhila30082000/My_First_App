import { GET_ENV_DETAILS_TYPE } from '../../types';

const getEnvironmentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ENV_DETAILS_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default getEnvironmentDetailsReducer;
