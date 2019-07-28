import axios from 'axios';

const USER_API_URL = '/api/users';
const EVENT_API_URL = '/api/events';
const USER_EVENT_API_URL = '/api/userEvents';
const COMMENT_API_URL= '/api/comments';
const AUTH_URL= '/auth';

export default {
  // User

  getAllUsers: () => {
    return axios.get(`${USER_API_URL}`)
  },

  createUser: (user) => {
    // TODO Get user info first
    return axios.post(`${USER_API_URL}`, user);
  },

    /**
   * @param {string} userId
   */
  findUserById: async (userId) => {
    try {
      return await axios.get(`${USER_API_URL}/${userId}`)
    } catch (err) {
      return err
    }
  },
 
  // check to see if user is logged in ---protected route
  // create our verify url and passing in an Authorization header in headers
  // passing in the token value with ${token} from our utils API call on our googleLogin component
  authorize: async (token) => {
    try {
      axios.get(`${AUTH_URL}/verify`, {headers: {Authorization:`Bearer ${token}`}})
      // authorized user data sent from our server after google authorization response
      .then(res => {
        // console.log(res);
        console.log("res.data", res.data)
        let authUser = JSON.stringify(res.data);
        localStorage.setItem('authUser', authUser);
        const parseUserObj = JSON.parse(localStorage.getItem('authUser'));
        const token = parseUserObj.token
        console.log("parsed user localstorage token: ", token);
        return;
      })
      .catch(err => {
        console.log(err)
      })
    } catch (err) {
      console.log(err);
      return err
    }
  },

  // function for protected route to get the token from local storage
  protectedRoute: async (req, res) => {
    try {
      // grabbing the stored token from local storage
      const parseUserObj = JSON.parse(localStorage.getItem('authUser'));
      const token = parseUserObj.token
      axios.get(`/auth/test`, {headers: {Authorization:`Bearer ${token}`}}) // passing in stored token here
      .then(res => console.log(res))
      .then(alert("Authorized User token Access Granted!"))
      .catch(err => console.log(err))
    } catch (err) {
      console.log(err);
      alert("Please Login to access that page");
    }
  },

  updateUser: (user) => {
    return axios.put(`${USER_API_URL}/${user.id}`, user);
  },

  /**
   * @param {string} userId
   */
  deleteUser: (userId) => {
    return axios.delete(`${USER_API_URL}/${userId}`);
  },

  // Event

  findAllEvents: () => {
    return axios.get(`${EVENT_API_URL}`);
  },

/**
 *  Find all events within a (currently hard coded distance of 10,000 meters) from a coordinate
 * @param {int} longitude 
 * @param {int} latitude 
 */
  findEventsNear: (latitude, longitude) => {
    return axios.get(`${EVENT_API_URL}/${latitude}/${longitude}`);
  },

  /**
   * Create event (Also creates a UserEvent document for the event creator with their event)
   */
  createEvent: (event) => {
    // TODO Get event info first
    return axios.post(`${EVENT_API_URL}`, event);
  },

  /**
   * @param {string} eventId 
   */
  findEventById(eventId) {
    return axios.get(`${EVENT_API_URL}/${eventId}`);
  },

  updateEvent: (event) => {
    return axios.put(`${EVENT_API_URL}/${event.id}`, event);
  },

  /**
   * Delete event by id (Also deletes all UserEvent docs with an event_id === eventId)
   * @param {string} eventId
   */
  deleteEvent: (eventId) => {
    return axios.delete(`${EVENT_API_URL}/${eventId}`);
  },

  // UserEvent


  getAllUserEvents: () => {
    return axios.get(`${USER_EVENT_API_URL}`)
  },

  createUserEvent: (userEvent) => {
    // TODO Get user info first
    return axios.post(`${USER_EVENT_API_URL}`, userEvent);
  },

  /**
   * @param {string} userEventId
   */
  findUserEventsById: (userEventId) => {
    return axios.get(`${USER_EVENT_API_URL}/${userEventId}`)
  },

  /**
   * @param {string} userEventId
   */
  deleteUserEvent: (userEventId) => {
    return axios.delete(`${USER_EVENT_API_URL}/${userEventId}`);
  },

   /**
   * @param {string} user_id
   */
  findEventsForUser: (user_id) => {
    return axios.get(`${USER_EVENT_API_URL}/user/${user_id}`)
  },

   /**
   * @param {string} event_id
   */
  findUsersForEvent: (event_id) => {
    return axios.get(`${USER_EVENT_API_URL}/event/${event_id}`)
  },

   /**
   * @param {string} user_id
   * @param {string} event_id
   */
  deleteUserEventByUserIdEventId: (user_id, event_id) => {
    return axios.delete(`${USER_EVENT_API_URL}/${user_id}/${event_id}`);
  },

  /**
   * @param {string} user_id
   * @param {string} event_id
   */
  findUserEventByUserIdEventId: (user_id, event_id) => {
    return axios.get(`${USER_EVENT_API_URL}/${user_id}/${event_id}`);
  },

  // Comments

  getAllComments: () => {
    return axios.get(`${COMMENT_API_URL}/`);
  },

  /**
   * Create event (Also creates a UserEvent document for the event creator with their event)
   */
  createComment: (comment) => {
    // TODO Get event info first
    return axios.post(`${COMMENT_API_URL}/`, comment);
  },

  /**
   * @param {string} commentId 
   */
  findCommentById(commentId) {
    return axios.get(`${COMMENT_API_URL}/${commentId}`);
  },

  updateComment: (comment) => {
    return axios.put(`${COMMENT_API_URL}/${comment.id}`, comment);
  },

  /**
   * @param {string} commentid
   */
  deleteCommentById: (commentid) => {
    return axios.delete(`${COMMENT_API_URL}/${commentid}`);
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

};
