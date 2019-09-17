import axios from 'axios';
import { getJWTToken } from './localStorageHelper';
import store from '../redux/store';

const USER_API_URL = '/api/users';
const EVENT_API_URL = '/api/events';
const USER_EVENT_API_URL = '/api/userEvents';
const COMMENT_API_URL = '/api/comments';
const AUTH_URL = '/auth';
const EVENT_LIKE_API_URL = '/api/eventLikes';

// Helper function to get token from local storage pass this function to our protected routes to create auth headers
const generateAuthHeaders = () => {
  const token = getJWTToken();
  const headers = {
    headers: { Authorization: `bearer ${token}` },
  };
  return headers;
};

const getUserId = () => {
  return store.getState().authState.id;
};

export default {

  // Authentication and Authorization

  // check to see if user is logged in ---protected route
  // create our verify url and passing in an Authorization header in headers
  // passing in the token value with ${token} from our utils API call on our googleLogin component
  authorizeSignup: (user) => {
    return axios.post(`${AUTH_URL}/signup`, user);
  },

  authorizeLogin: (user) => {
    return axios.post(`${AUTH_URL}/login`, user);
  },

  // function for testing protected route to get the token from local storage
  protectedRoute: (userId) => {
    // grabbing the stored token from local storage and put in headers
    axios.get(`/auth/protected/${userId}`, generateAuthHeaders()) // passing in stored token here
      .then(res => console.log(res))
      .then(alert('Authorized User token Access Granted!'))
      .catch(err => console.log(err.response));
  },

  // User

  getAllUsers: () => {
    return axios.get(`${USER_API_URL}`);
  },

  /**
 * @param {string} userId
 */
  findUserById: (userId) => {
    return axios.get(`${USER_API_URL}/${userId}`);
  },

  updateUser: (user) => {
    return axios.put(`${USER_API_URL}/${user.id}`, user, generateAuthHeaders());
  },

  /**
   * @param {string} userId
   */
  deleteUser: (userId) => {
    return axios.delete(`${USER_API_URL}/${userId}`, generateAuthHeaders());
  },

  // Event

  findAllEvents: () => {
    return axios.get(`${EVENT_API_URL}`);
  },

  /**
   *  Find all events within a (currently hard coded distance of 10,000 meters) from a coordinate
   * @param {number} longitude
   * @param {number} latitude
   */
  findEventsNear: (latitude, longitude) => {
    return axios.get(`${EVENT_API_URL}/${latitude}/${longitude}`);
  },

  /**
   * Create event (Also creates a UserEvent document for the event creator with their event)
   */
  createEvent: (event) => {
    // TODO Get event info first
    return axios.post(`${EVENT_API_URL}`, event, generateAuthHeaders());
  },

  /**
   * @param {string} eventId
   */
  findEventById(eventId) {
    return axios.get(`${EVENT_API_URL}/${eventId}`);
  },

  updateEvent: (event) => {
    return axios.put(`${EVENT_API_URL}/${event.id}`, event, generateAuthHeaders());
  },

  /**
   * Delete event by id (Also deletes all UserEvent docs with an event_id === eventId)
   * @param {string} eventId
   */
  deleteEvent: (eventId) => {
    return axios.delete(`${EVENT_API_URL}/${eventId}`, generateAuthHeaders());
  },

  // UserEvent


  getAllUserEvents: () => {
    return axios.get(`${USER_EVENT_API_URL}`);
  },

  createUserEvent: (userEvent) => {
    // TODO Get user info first
    return axios.post(`${USER_EVENT_API_URL}`, userEvent, generateAuthHeaders());
  },

  /**
   * @param {string} userEventId
   */
  findUserEventsById: (userEventId) => {
    return axios.get(`${USER_EVENT_API_URL}/${userEventId}`);
  },

  /**
   * @param {string} userEventId
   */
  deleteUserEvent: (userEventId) => {
    return axios.delete(`${USER_EVENT_API_URL}/${userEventId}`, generateAuthHeaders());
  },

  /**
  * @param {string} user_id
  */
  findEventsForUser: (user_id) => {
    return axios.get(`${USER_EVENT_API_URL}/user/${user_id}`);
  },

  /**
 * @param {string} user_id
 */
  findEventsUserCreatedOnly: (user_id) => {
    return axios.get(`${USER_EVENT_API_URL}/user/${user_id}/create-only`);
  },

  /**
   * @param {string} user_id
   */
  findEventsUserAttendingNotCreated: (user_id) => {
    return axios.get(`${USER_EVENT_API_URL}/user/${user_id}/attend-only`);
  },

  /**
  * @param {string} event_id
  */
  findUsersForEvent: (event_id) => {
    return axios.get(`${USER_EVENT_API_URL}/event/${event_id}`);
  },

  /**
  * @param {string} event_id
  */
  deleteUserEventByUserIdEventId: (event_id) => {
    return axios.delete(`${USER_EVENT_API_URL}/${getUserId()}/${event_id}`, generateAuthHeaders());
  },

  /**
   * @param {string} user_id
   * @param {string} event_id
   */
  findUserEventByUserIdEventId: (event_id) => {
    return axios.get(`${USER_EVENT_API_URL}/${getUserId()}/${event_id}`);
  },

  // Comments

  getAllComments: () => {
    return axios.get(`${COMMENT_API_URL}/`);
  },

  /**
   * Create a comment for an event
   */
  createComment: (comment) => {
    // TODO Get event info first
    return axios.post(`${COMMENT_API_URL}/`, comment, generateAuthHeaders());
  },

  /**
   * @param {string} commentId
   */
  findCommentById(commentId) {
    return axios.get(`${COMMENT_API_URL}/${commentId}`);
  },

  updateComment: (comment) => {
    return axios.put(`${COMMENT_API_URL}/${comment.id}`, comment, generateAuthHeaders());
  },

  /**
   * @param {string} commentid
   */
  deleteCommentById: (commentid) => {
    return axios.delete(`${COMMENT_API_URL}/${commentid}`, generateAuthHeaders());
  },

  /**
   * @param {string} userId
   */
  findCommentsForUserId(userId) {
    return axios.get(`${COMMENT_API_URL}/user/${userId}`);
  },

  /**
  * @param {string} eventId
  */
  findCommentsForEventId(eventId) {
    return axios.get(`${COMMENT_API_URL}/event/${eventId}`);
  },

  // Event Likes

  getAllEventLikes: () => {
    return axios.get(`${EVENT_LIKE_API_URL}`);
  },

  /**
   * @param {event_id: string} eventLike
   */
  createEventLike: (eventLike) => {
    return axios.post(`${EVENT_LIKE_API_URL}`, eventLike, generateAuthHeaders());
  },

  /**
   * @param {string} eventLikeId
   */
  deleteEventLikeById: (eventLikeId) => {
    return axios.delete(`${EVENT_LIKE_API_URL}/${eventLikeId}`, generateAuthHeaders());
  },

  /**
  * @param {string} event_id
  */
  findEventLikesForEvent: (event_id) => {
    return axios.get(`${EVENT_LIKE_API_URL}/event/${event_id}`);
  },

  /**
  * @param {string} event_id
  */
  findEventLikeByUserIdEventId: (event_id) => {
    return axios.get(`${EVENT_LIKE_API_URL}/${getUserId()}/${event_id}`);
  },

  /**
  * @param {string} event_id
  */
  deleteEventLikeByUserIdEventId: (event_id) => {
    return axios.delete(`${EVENT_LIKE_API_URL}/${getUserId()}/${event_id}`, generateAuthHeaders());
  },

};
