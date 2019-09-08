import * as ACTION_TYPES from "../actionTypes";
import store from '../store';
import API from '../../utils/API';
import { NamedUser } from '../../utils/classes';


const setEvent = (event) => ({
  type: ACTION_TYPES.SET_EVENT,
  payload: event
})

const setAttendingUsers = (attendees) => ({
  type: ACTION_TYPES.SET_ATTENDING_USERS,
  payload: attendees,
})

const setNumEventLikes = (numLikes) => ({
  type: ACTION_TYPES.NUM_EVENT_LIKES,
  payload: numLikes,
})

const setUserAttendance = (isAttending) => ({
  type: ACTION_TYPES.USER_IS_ATTENDING_EVENT,
  payload: isAttending,
})

const setUserLikesEvent = (likesEvent) => ({
  type: ACTION_TYPES.USER_LIKES_EVENT,
  payload: likesEvent,
})

export const removeEvent = () => ({
  type: ACTION_TYPES.REMOVE_EVENT
})

export const initEventState = (eventId) => {

  return async (dispatch) => {
    Promise.all([
      dispatch(getEvent(eventId)),
      dispatch(getAttendingUsers(eventId)),
      dispatch(getNumEventLikes(eventId)),
      
      dispatch(getUserAttendenceForEvent(eventId)),
      dispatch(getUserLikesEvent(eventId)),
    ])
  }
}

const getEvent = (eventId) => {
  return async (dispatch) => {
    let event = {};
    try {
      const res = await API.findEventById(eventId)
      if (res.data) { // event exists
        event = res.data
      }
    } catch (err) {
      // Error fetching event. Don't mutate state
    }
    return dispatch(setEvent(event))
  }
}

const getAttendingUsers = (eventId) => {
  return async (dispatch) => {
    let attendingUsers = [];
    try {
      const res = await API.findUsersForEvent(eventId);
      attendingUsers = res.data.map(userEvent => {
        const user = userEvent.user_id;
        return new NamedUser(user.first_name, user.last_name, user._id)
      });
    } catch (err) {
      //  Error fetching attendees
    }
    return dispatch(setAttendingUsers(attendingUsers))
  }
}

const getNumEventLikes = (eventId) => {
  return async (dispatch) => {
    let numEventLikes = 0;
    try {
      const res = await API.findEventLikesForEvent(eventId)
      numEventLikes = res.data.numLikes;
    } catch (err) {
      // Error fetching number of event likes
    }
    return dispatch(setNumEventLikes(numEventLikes));
  }
}

const getUserAttendenceForEvent = (eventId) => {
  return async (dispatch) => {
    let isAttending = false;
    try {
      const res = await API.findUserEventByUserIdEventId(eventId);
      if (res.data) {
        isAttending = true;
      }
    } catch (err) {
      // Error in fetching user attendance
    }
    return dispatch(setUserAttendance(isAttending));
  }
}

const getUserLikesEvent = (eventId) => {
  return async (dispatch) => {
    let userLikesEvent = false;
    try {
      const res = await API.findEventLikeByUserIdEventId(eventId)
      if (res.data) {
        userLikesEvent = true;
      }
    } catch (err) {
      // Error in fetching if user likes event
    }
    return dispatch(setUserLikesEvent(userLikesEvent));
  }
}

export const updateUserLikesEvent = (eventId) => {
  return async (dispatch) => {
    let numEventLikes = store.getState().eventDetail.numEventLikes;
    let userLikesEvent = store.getState().eventDetail.userLikesEvent;

    try {
      if (userLikesEvent) {
        await API.deleteEventLikeByUserIdEventId(eventId)
        userLikesEvent = false
        numEventLikes = numEventLikes - 1
      } else {
        await API.createEventLike({ event_id: eventId })
        userLikesEvent = true
        numEventLikes = numEventLikes + 1
      }
    } catch (err) {
      // Error in updating user event like
    }
    dispatch(setUserLikesEvent(userLikesEvent));
    dispatch(setNumEventLikes(numEventLikes))
  }
}
