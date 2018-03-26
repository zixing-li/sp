import { combineReducers } from "redux";
import authReducer from './authReducer'
import industriesReducer from './industriesReducer'
import packagesReducer from './packagesReducer'

const rootReducer = combineReducers({
  industries: industriesReducer,
  packages: packagesReducer,
  auth: authReducer
});

export default rootReducer;