import { REQUEST_COUNT } from '../../types';

const requestCountData = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_COUNT:
      return action.data;
    default:
      return state;
  }
};
export default requestCountData;
