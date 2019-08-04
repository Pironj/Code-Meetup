import { createStore, compose } from "redux";
import rootReducer from '../reducers/index';
import { getAuthState } from "../../utils/localStorageHelper";

// Store initial logged in credentials if available on page reload in Redux store
const loadState = () => {
  try {
    const serializedState = getAuthState();
    if (serializedState === null) {
      return {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        token: ''
      }
    }
    return serializedState;
  } catch (err) {
    return undefined;
  }
};

export default createStore(
  rootReducer,
  {
    authState: loadState() // Load local storage into initial state on page load
  },
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
