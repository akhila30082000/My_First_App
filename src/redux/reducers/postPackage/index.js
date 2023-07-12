import { ADD_PACKAGE_TYPE } from '../../types';

const postPackageReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PACKAGE_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default postPackageReducer;
