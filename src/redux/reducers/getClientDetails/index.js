import { GETCLIENT_TYPE } from '../../types';

const getClientReducer = (state = {}, action) => {
  switch (action.type) {
    case GETCLIENT_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default getClientReducer;
