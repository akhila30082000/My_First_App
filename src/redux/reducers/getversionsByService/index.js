import { GET_VERSIONS_SERVICE } from '../../types';

const getAllVersionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_VERSIONS_SERVICE:
      return action.data;

    default:
      return state;
  }
};
export default getAllVersionsReducer;
