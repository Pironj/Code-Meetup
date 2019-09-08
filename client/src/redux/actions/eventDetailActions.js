import { SET_EVENT, REMOVE_EVENT, SET_ATTENDING_USERS } from "../actionTypes";

import API from '../../utils/API';
import { NamedUser } from '../../utils/classes';


export const setEvent = (event) => ({
  type: SET_EVENT,
  payload: event
})

export const removeEvent = () => ({
  type: REMOVE_EVENT
})

export const setAttendingUsers = (attendees) => ({
  type: SET_ATTENDING_USERS,
  payload: attendees,
})

export const getEvent = (eventId) => {
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

export const getAttendingUsers = (eventId) => {
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

export const getNumEventLikes = (eventId) => {

  API.findEventLikesForEvent(this.state.eventId)
    .then(res => {
      if (res.data) {
        this.setState({
          numEventLikes: res.data.numLikes
        })
      }
    }).catch(err => {
      console.log(err.response);
    })
}



// getUserAttendenceForEvent = () => {
//   API.findUserEventByUserIdEventId(this.state.eventId)
//     .then((res) => {
//       if (res.data) {
//         this.setState({
//           attend: true,
//         });
//       }
//     })
//     .catch((err) => console.log(err));
// }





// getUserLikesEvent = () => {
//   API.findEventLikeByUserIdEventId(this.state.eventId)
//     .then(res => {
//       if (res.data) {
//         this.setState({ userLikesEvent: true })
//       }
//     })
// }
