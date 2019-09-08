import * as ACTION_TYPES from "../actionTypes";
import { initialEventDetailState } from '../initialState'


export default function (state = initialEventDetailState, action) {
  switch (action.type) {

    case ACTION_TYPES.SET_EVENT: {
      const event = action.payload;

      return {
        ...state, // Spread operator returns a copy of current state
        event,
      }
    }

    case ACTION_TYPES.REMOVE_EVENT: {
      return {
        ...state,
        ...initialEventDetailState,
      }
    }

    case ACTION_TYPES.SET_ATTENDING_USERS: {
      const attendees = action.payload;
      return {
        ...state,
        attendees,
      }
    }

    case ACTION_TYPES.NUM_EVENT_LIKES: {
      const numEventLikes = action.payload;
      return {
        ...state,
        numEventLikes,
      }
    }

    case ACTION_TYPES.USER_IS_ATTENDING_EVENT: {
      const isAttending = action.payload;
      return {
        ...state,
        isAttending,
      }
    }

    case ACTION_TYPES.USER_LIKES_EVENT: {
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