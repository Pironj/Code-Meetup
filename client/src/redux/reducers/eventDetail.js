import * as actionTypes from "../actionTypes";
import { initialEventDetailState } from '../initialState'


export default function (state = initialEventDetailState, action) {
  switch (action.type) {

    case actionTypes.SET_EVENT: {
      const event = action.payload;

      return {
        ...state, // Spread operator returns a copy of current state
        event,
      }
    }

    case actionTypes.REMOVE_EVENT: {
      return {
        ...state,
        ...initialEventDetailState,
      }
    }

    case actionTypes.SET_ATTENDING_USERS: {
      const attendees = action.payload;
      return {
        ...state,
        attendees,
      }
    }

    case actionTypes.NUM_EVENT_LIKES: {
      const numEventLikes = action.payload;
      return {
        ...state,
        numEventLikes,
      }
    }

    case actionTypes.USER_IS_ATTENDING_EVENT: {
      const isAttending = action.payload;
      return {
        ...state,
        isAttending,
      }
    }

    case actionTypes.USER_LIKES_EVENT: {
      const userLikesEvent = action.payload;
      return {
        ...state,
        userLikesEvent,
      }
    }

    default:
      return state;
  }
}
