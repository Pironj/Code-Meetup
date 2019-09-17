
import React from 'react';
import ReactDOM from 'react-dom';
// Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
