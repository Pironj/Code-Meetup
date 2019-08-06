import { SET_AUTH_STATE, DELETE_AUTH_STATE } from "../actionTypes";

/**
 * For logging in or signing up a user in redux
 * @param {} auth 
 */
export const setAuthState = auth => ({
  type: SET_AUTH_STATE,
  payload: auth
})

/**
 * Remove user details from Redux store
 */
export const deleteAuthState = () => ({
  type: DELETE_AUTH_STATE,
})
