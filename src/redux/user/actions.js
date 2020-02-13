const actions = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGOUT: 'LOGOUT',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
    login: (parameters, callback) => ({
      type: actions.LOGIN_REQUEST,
      userRequest: parameters,
      callback: callback,
    }),
    logout: () => ({
      type: actions.LOGOUT,
    }),
  }
  
  export default actions
  