import { DELETE_PACKAGE_BY_ID_TYPE } from '../../types';

const deletePackageById = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PACKAGE_BY_ID_TYPE:
      return action.data;
    default:
      return state;
  }
};

export default deletePackageById;
