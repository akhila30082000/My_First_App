import { GET_HISTORY_TYPE } from '../../types';

const getAllHistory = (state = {}, action) => {
  switch (action.type) {
    case GET_HISTORY_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default getAllHistory;
