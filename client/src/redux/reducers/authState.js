import { SET_AUTH_STATE, DELETE_AUTH_STATE } from '../actionTypes';
import { setAuthStateLocalStorage, deleteAuthState } from '../../utils/localStorageHelper';
import { initialAuthState } from '../initialState';


export default function (state = initialAuthState, action) {
  switch (action.type) {

  case SET_AUTH_STATE: {
    const content = action.payload;

    setAuthStateLocalStorage(content);

    return {
      ...state, // Spread operator returns a copy of current state
      id: content.id,
      first_name: content.first_name,
      last_name: content.last_name,
      email: content.email,
      token: content.token,
    };
  }

  case DELETE_AUTH_STATE: {
    deleteAuthState();

    return {
      ...state,
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      token: '',
    };
  }
  default:
    return state;
  }
}
