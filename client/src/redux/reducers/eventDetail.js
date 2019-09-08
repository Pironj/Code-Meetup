import { SET_EVENT, REMOVE_EVENT, SET_ATTENDING_USERS } from "../actionTypes";
import {initialEventDetailState} from '../initialState'


export default function (state = initialEventDetailState, action) {
  switch (action.type) {

    case SET_EVENT: {
      const event = action.payload;
      
      return {
        ...state, // Spread operator returns a copy of current state
        event,
      }
    }

    case REMOVE_EVENT: {
      return {
        ...state,
        ...initialEventDetailState,
      }
    }

    case SET_ATTENDING_USERS: {
      const attendees = action.payload;
      return {
        ...state,
        attendees,
      }
    }



    default:
      return state;
  }
}