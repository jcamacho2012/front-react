import { all, takeEvery, put } from 'redux-saga/effects'
import restClient from '../../services/restClient'
import {push} from 'react-router-redux'
import actions from './actions'

export function* loginRequest(parameters) {
  console.log(parameters)
  const response = yield restClient.getPrueba().catch(err => {    
    console.log(err)
    parameters.callback(err.message)
  })

  console.log("response", response)

  if (response !== undefined) {
    if (response.status === 200) {
      console.log("yield", response.data.user.token)
      yield restClient.setTokenToAxio(response.data.user.token)

      yield put({
        type: actions.LOGIN_SUCCESS,
        profile: response.data.user,
      })
      yield put(push('/dashboard'));
    }
  }
}

export function* LOGOUT(){
  // yield restClient.setTokenToAxio(null)
  yield put({
    type: actions.LOGOUT,
    profile: {},
  })

  yield put(push('/login'));
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN_REQUEST, loginRequest),
    // takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    // takeEvery(actions.LOGOUT, LOGOUT)
    // LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
