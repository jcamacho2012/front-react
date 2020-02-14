import actions from './actions'

const initState = {}

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { ...state, ...{ profile: action.profile } }
    case actions.LOGOUT:
      console.log("ejecuta reducer logout")
      return initState
    default:
      return state
  }
}
