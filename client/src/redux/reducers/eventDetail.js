import { SET_EVENT } from "../actionTypes";
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

    default:
      return state;
  }
}