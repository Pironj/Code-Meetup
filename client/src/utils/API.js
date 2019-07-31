import axios from 'axios';

const USER_API_URL = '/api/users';
const EVENT_API_URL = '/api/events';
const USER_EVENT_API_URL = '/api/userEvents';
const COMMENT_API_URL= '/api/comments';
const AUTH_URL= '/auth';

// Helper function to get token from local storage pass this function to our protected routes to create auth headers
const getToken = () => {
  const parseUserObj = JSON.parse(localStorage.getItem('authUser'));
  const token = parseUserObj.token
  const headers = {headers: {Authorization:`Bearer ${token}`}}
  return headers;
}
export default {
  
  // Get JWT from local storage

  // User

  getAllUsers: () => {
    return axios.get(`${USER_API_URL}`)
  },

    /**
   * @param {string} userId
   */
  
  findUserById: async (userId) => {
    // const parseUserObj = JSON.parse(localStorage.getItem('authUser'));
    // const token = parseUserObj.token
    try {
      axios.get(`${USER_API_URL}/${userId}`) // to protect add getToken() function as param to get req
      .then(res => {
        console.log('======= TEST RESPONSE =======\n', res);
      }) 
    } catch (err) {
      return err
    }
  },
 
  // check to see if user is logged in ---protected route
  // create our verify url and passing in an Authorization header in headers
  // passing in the token value with ${token} from our utils API call on our googleLogin component
  authorizeSignup: async (user) => {
    console.log(user);
    try {
      axios.post(`${AUTH_URL}/signup`, user)
      // authorized user data sent from our server after google authorization response
      .then(res => {
        console.log(res);
        let authUser = JSON.stringify({id: res.data.user._id, first_name: res.data.user.first_name, last_name: res.data.user.last_name, email: res.data.user.email, token: res.data.token});
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

  authorizeLogin: async (user) => {
    try {
      axios.post(`${AUTH_URL}/login`, user)
      // authorized user data sent from our server after google authorization response
      .then(res => {
        console.log("========= RESPONSE ========\n", res);
        console.log(res.data.user._id, res.data.user.email, res.data.token);
        let authUser = JSON.stringify({id: res.data.user._id, first_name: res.data.user.first_name, last_name: res.data.user.last_name, email: res.data.user.email, token: res.data.token});
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
    return axios.delete(`${USER_API_URL}/${userId}`); // to protect add getToken() function as param to get req
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
    return axios.get(`${EVENT_API_URL}/${latitude}/${longitude}`); // to protect add getToken() function as param to get req
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
    return axios.get(`${EVENT_API_URL}/${eventId}`); // to protect add getToken() function as param to get req
  },

  updateEvent: (event) => {
    return axios.put(`${EVENT_API_URL}/${event.id}`, event); // to protect add getToken() function as param to get req
  },

  /**
   * Delete event by id (Also deletes all UserEvent docs with an event_id === eventId)
   * @param {string} eventId
   */
  deleteEvent: (eventId) => {
    return axios.delete(`${EVENT_API_URL}/${eventId}`); // to protect add getToken() function as param to get req
  },

  // UserEvent


  getAllUserEvents: () => {
    return axios.get(`${USER_EVENT_API_URL}`) // to protect add getToken() function as param to get req
  },

  createUserEvent: (userEvent) => {
    // TODO Get user info first
    return axios.post(`${USER_EVENT_API_URL}`, userEvent); // to protect add getToken() function as param to get req
  },

  /**
   * @param {string} userEventId
   */
  findUserEventsById: (userEventId) => {
    return axios.get(`${USER_EVENT_API_URL}/${userEventId}`) // to protect add getToken() function as param to get req
  },

  /**
   * @param {string} userEventId
   */
  deleteUserEvent: (userEventId) => {
    return axios.delete(`${USER_EVENT_API_URL}/${userEventId}`); // to protect add getToken() function as param to get req
  },

   /**
   * @param {string} user_id
   */
  findEventsForUser: (user_id) => {
    return axios.get(`${USER_EVENT_API_URL}/user/${user_id}`) // to protect add getToken() function as param to get req
  },

   /**
   * @param {string} event_id
   */
  findUsersForEvent: (event_id) => {
    return axios.get(`${USER_EVENT_API_URL}/event/${event_id}`) // to protect add getToken() function as param to get req
  },

   /**
   * @param {string} user_id
   * @param {string} event_id
   */
  deleteUserEventByUserIdEventId: (user_id, event_id) => {
    return axios.delete(`${USER_EVENT_API_URL}/${user_id}/${event_id}`); // to protect add getToken() function as param to get req
  },

  /**
   * @param {string} user_id
   * @param {string} event_id
   */
  findUserEventByUserIdEventId: (user_id, event_id) => {
    return axios.get(`${USER_EVENT_API_URL}/${user_id}/${event_id}`); // to protect add getToken() function as param to get req
  },

  // Comments

  getAllComments: () => {
    return axios.get(`${COMMENT_API_URL}/`); // to protect add getToken() function as param to get req
  },

  /**
   * Create event (Also creates a UserEvent document for the event creator with their event)
   */
  createComment: (comment) => {
    // TODO Get event info first
    return axios.post(`${COMMENT_API_URL}/`, comment); // to protect add getToken() function as param to get req
  },

  /**
   * @param {string} commentId 
   */
  findCommentById(commentId) {
    return axios.get(`${COMMENT_API_URL}/${commentId}`); // to protect add getToken() function as param to get req
  },

  updateComment: (comment) => {
    return axios.put(`${COMMENT_API_URL}/${comment.id}`, comment); // to protect add getToken() function as param to get req
  },

  /**
   * @param {string} commentid
   */
  deleteCommentById: (commentid) => {
    return axios.delete(`${COMMENT_API_URL}/${commentid}`); // to protect add getToken() function as param to get req
  },

  /**
   * @param {string} userId 
   */
  findCommentsForUserId(userId) {
    return axios.get(`${COMMENT_API_URL}/user/${userId}`); // to protect add getToken() function as param to get req
  },

   /**
   * @param {string} eventId 
   */
  findCommentsForEventId(eventId) {
    return axios.get(`${COMMENT_API_URL}/event/${eventId}`); // to protect add getToken() function as param to get req
  },

};
