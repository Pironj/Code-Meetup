import { SET_EVENT } from "../actionTypes";

import API from '../../utils/API';



export const setEvent = (event) => ({
  type: SET_EVENT,
  payload: event
})



export const getEvent = (eventId) => {
  return async (dispatch) => {

    const res = await API.findEventById(eventId)

    if (res.data) { // event exists
      return dispatch(setEvent(res.data))
    }
  }
}



// componentDidMount() {
//   Promise.all([
//     this.getEvent(),
    // this.getNumEventLikes(),
    // this.getAttendingUsers(),
    // this.getUserLikesEvent(),
    // this.getUserAttendenceForEvent(),
//   ])
// }

// componentDidUpdate() {
// 	console.log(this.state.userId)
// 	console.log(this.props.id)
// 	if (this.state.userId !== this.props.id) {
// 		this.setState({userID: this.props.id})

// 	}
  // Promise.all([
  // 	this.getUserLikesEvent(),
  // 	this.getUserAttendenceForEvent(),
  // ])
// }

// getAttendingUsers = () => {
//   API.findUsersForEvent(this.state.eventId)
//     .then(res => {
//       const attendingUsers = res.data.map(userEvent => {
//         const user = userEvent.user_id;
//         return new NamedUser(user.first_name, user.last_name, user._id)
//       })
//       this.setState({ attendees: attendingUsers })
//     }).catch(err => {
//       console.log(err)
//     })
// }

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



// getNumEventLikes = () => {
//   API.findEventLikesForEvent(this.state.eventId)
//     .then(res => {
//       if (res.data) {
//         this.setState({
//           numEventLikes: res.data.numLikes
//         })
//       }
//     }).catch(err => {
//       console.log(err.response);
//     })
// }

// getUserLikesEvent = () => {
//   API.findEventLikeByUserIdEventId(this.state.eventId)
//     .then(res => {
//       if (res.data) {
//         this.setState({ userLikesEvent: true })
//       }
//     })
// }
