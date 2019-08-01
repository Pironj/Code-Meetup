import { SET_AUTH_STATE, DELETE_AUTH_STATE } from "../actionTypes";


const initialState = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  jwt: '',
};

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_AUTH_STATE: {
      const content = action.payload;
      return {
        ...state,
        id: content.id,
        first_name: content.first_name,
        last_name: content.last_name,
        email: content.email,
        jwt: content.jwt,
      }
    }

    case DELETE_AUTH_STATE: {
      return {
        ...state,
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        jwt: '',
      }
    }
    default:
      return state;
  }
}
