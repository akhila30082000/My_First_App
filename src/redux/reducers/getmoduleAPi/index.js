import { GET_MODULE_TYPE } from '../../types';

const getModuleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MODULE_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default getModuleReducer;
