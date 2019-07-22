import axios from 'axios';

const USER_API_URL = '/api/users';
const EVENT_API_URL = '/api/events';
const USER_EVENT_API_URL = '/api/userEvents';
const COMMENT_API_URL= '/api/comments'

export default {
  // User

  getAllUsers: () => {
    return axios.get(`${USER_API_URL}`)
  },

  createuser: (user) => {
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

  getAllEvents: () => {
    return axios.get(`${EVENT_API_URL}`);
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
    return axios.delete(`${USER_EVENT_API_URL}/delete/${user_id}/${event_id}`);
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
