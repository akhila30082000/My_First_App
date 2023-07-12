import { PUT_PARTNER_PACKAGE_TYPE } from '../../types';

const putPartnerPackage = (state = {}, action) => {
  switch (action.type) {
    case PUT_PARTNER_PACKAGE_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default putPartnerPackage;
