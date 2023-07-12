import { ONBOARD_PARTNER_TYPE } from '../../types';

const onBoardPartner = (state = {}, action) => {
  switch (action.type) {
    case ONBOARD_PARTNER_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default onBoardPartner;
