import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reduxThunk from "redux-thunk";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, {}, compose(applyMiddleware(reduxThunk)))
export const persistor = persistStore(store)


// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers';

// const store = createStore(rootReducer, {}, applyMiddleware(thunk));

// export default store