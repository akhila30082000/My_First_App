import { GET_PACKAGE_BY_ID } from '../../types';

const getPackageDataByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PACKAGE_BY_ID:
      return action.data;

    default:
      return state;
  }
};
export default getPackageDataByIdReducer;
