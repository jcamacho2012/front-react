import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'

export default history => {
  return {
    router: connectRouter(history),
    user,
  }
}
