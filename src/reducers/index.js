// import { combineReducers } from "redux";
import IndustriesReducer from './IndustriesReducer'
import PackagesReducer from './PackagesReducer'

// const rootReducer = combineReducers({
//   industries: IndustriesReducer,
//   packages: PackagesReducer,
// });

// export default rootReducer;

import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

// import rootReducer from './reducers'
const rootReducer = combineReducers({
  industries: IndustriesReducer,
  packages: PackagesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}