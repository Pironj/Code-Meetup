import { createStore, compose } from "redux";
import rootReducer from '../reducers/index';
import { getAuthState } from "../../utils/localStorageHelper";


export default createStore(
  rootReducer,
  {
    authState: {
      getAuthState
    }
  },
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
