import { GET_APILIST_BYVERSION } from '../../types';

const getApiByVersionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_APILIST_BYVERSION:
      return action.data;

    default:
      return state;
  }
};
export default getApiByVersionReducer;
