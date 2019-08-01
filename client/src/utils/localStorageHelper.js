/**
 * Helper functions to read and write to local storage for storing an authenticated user and JSON Web Token
 */

// Helper function to get user details and token from local storage
export const getAuthState = () => {
  return JSON.parse(localStorage.getItem('authUser'));
}

export const getJWTToken = () => {
  return getFullAuthenticationState().token;
}

export const setAuthState = (authorizedUser) => {
  const authUser = JSON.stringify(
    {
      id: authorizedUser._id,
      first_name: authorizedUser.first_name,
      last_name: authorizedUser.last_name,
      email: authorizedUser.email,
      token: authorizedUser.token
    }
  );
  localStorage.setItem('authUser', authUser);
}

export const deleteAuthState = () => {
  localStorage.removeItem('authUser');
}

