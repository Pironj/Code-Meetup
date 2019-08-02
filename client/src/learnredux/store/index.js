import { createStore, compose } from "redux";
import rootReducer from '../reducers/index';
import { getAuthState } from "../../utils/localStorageHelper";

console.log(getAuthState());
export const loadState = () => {
  try {
    const serializedState = getAuthState();
    if (serializedState === null) {
      return {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        token: ''
    }}
    return serializedState;
  } catch (err) {
    return undefined;
  }
};

export default createStore(
  rootReducer,
  {
    authState: loadState()
  },
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
