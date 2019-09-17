import { combineReducers } from 'redux';
import authState from './authState';
import eventDetail from './eventDetail';

export default combineReducers(
  {
    authState,
    eventDetail,
  }
);
