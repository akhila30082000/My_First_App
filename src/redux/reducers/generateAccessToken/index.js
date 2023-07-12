import { Access_Type } from '../../types';

const generateAccessReducer = (state = {}, action) => {
  switch (action.type) {
    case Access_Type:
      return action.data;

    default:
      return state;
  }
};
export default generateAccessReducer;
