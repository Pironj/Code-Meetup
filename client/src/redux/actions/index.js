import { SET_AUTH_STATE, DELETE_AUTH_STATE } from "../actionTypes";


export const setAuthState = auth => ({
  type: SET_AUTH_STATE,
  payload: auth
})

export const deleteAuthState = () => ({
  type: DELETE_AUTH_STATE,
})
