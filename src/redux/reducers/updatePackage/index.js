import { PUT_PACKAGE_TYPE } from '../../types';

const updatePackage = (state = {}, action) => {
  switch (action.type) {
    case PUT_PACKAGE_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default updatePackage;
