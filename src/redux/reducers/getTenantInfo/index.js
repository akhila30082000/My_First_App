import { GET_TENANT_TYPE } from '../../types';

const getTenantInfo = (state = {}, action) => {
  switch (action.type) {
    case GET_TENANT_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default getTenantInfo;
