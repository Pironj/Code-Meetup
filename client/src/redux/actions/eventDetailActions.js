import * as actionTypes from "../actionTypes";
import store from '../store';
import API from '../../utils/API';
import { NamedUser } from '../../utils/classes';

/**
 * Synchronous Actions
**/

const setEvent = (event) => ({
  type: actionTypes.SET_EVENT,
  payload: event
})

const setAttendingUsers = (attendees) => ({
  type: actionTypes.SET_ATTENDING_USERS,
  payload: attendees,
})

const setNumEventLikes = (numLikes) => ({
  type: actionTypes.NUM_EVENT_LIKES,
  payload: numLikes,
})

const setUserAttendance = (isAttending) => ({
  type: actionTypes.USER_IS_ATTENDING_EVENT,
  payload: isAttending,
})

const setUserLikesEvent = (likesEvent) => ({
  type: actionTypes.USER_LIKES_EVENT,
  payload: likesEvent,
})

export const removeEvent = () => ({
  type: actionTypes.REMOVE_EVENT
})

/**
 * Asynchronous Actions allowed by redux-thunk package
**/

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

export const updateEventStateOnAuthChange = (eventId) => {

  return async (dispatch) => {
    if (store.getState().authState.id) {
      Promise.all([
        dispatch(getUserAttendenceForEvent(eventId)),
        dispatch(getUserLikesEvent(eventId)),
      ])
    } else {
      dispatch(setUserAttendance(false));
      dispatch(setUserLikesEvent(false))
    }
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

export const updateUserAttendance = (eventId) => {
  const eventDetailState = store.getState().eventDetail;

  let attendees = eventDetailState.attendees;
  const { first_name, last_name, id } = store.getState().authState;
  let isAttending = eventDetailState.isAttending;

  return async (dispatch) => {
    if (isAttending) {
      try {
        await API.deleteUserEventByUserIdEventId(eventId);

        attendees = attendees.filter(user => {
          return user._id !== id;
        })
        isAttending = false;

      } catch (err) {
        // Error in deleting UserEvent document
      }
    } else {
      try {
        await API.createUserEvent({
          event_id: eventId,
        });
        attendees.push(new NamedUser(first_name, last_name, id));
        isAttending = true;

      } catch (err) {
        // Error in creating UserEvent document
      }
    }
    dispatch(setUserAttendance(isAttending));
    dispatch(setAttendingUsers(attendees));
  }
}
