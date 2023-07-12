import { GET_ALLPARTNERS_TYPE } from '../../types';

const getAllPartnersByClient = (state = {}, action) => {
  switch (action.type) {
    case GET_ALLPARTNERS_TYPE:
      return action.data;

    default:
      return state;
  }
};
export default getAllPartnersByClient;
