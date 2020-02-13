import { createStore, applyMiddleware, compose } from 'redux'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import thunk from 'redux-thunk'
import createEncryptor from 'redux-persist-transform-encrypt'
import rootReducer from './reducers'

const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [thunk, sagaMiddleware, routeMiddleware]

const encryptor = createEncryptor({
  secretKey: '45d18a38ea58417f0e8e3fb524bce2977ca72015',
  onError: function(error) {
    // Handle the error.
  },
})
const persistConfig = {
  transforms: [encryptor],
  key: 'fms',
  storage,
}

const store = createStore(
  persistCombineReducers(persistConfig, {
    ...rootReducer(history),
  }),
  compose(applyMiddleware(...middlewares)),
)
console.log(store.getState())

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }
// let store = createStore(persistedReducer)
// let persistor = persistStore(store)
//  sagaMiddleware.run(sagas)
export { store, history, sagaMiddleware }
