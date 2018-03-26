// import { createStore, compose } from 'redux';
// import rootReducer from './reducers';
// import { persistStore } from 'redux-persist'

// const store = createStore(rootReducer);

// persistStore(store)

// export default store


import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reduxThunk from "redux-thunk";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// to figure out where to put `applyMiddleware`
// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }

export const store = createStore(persistedReducer, {}, compose(applyMiddleware(reduxThunk)))
export const persistor = persistStore(store)