import { combineReducers } from "redux";
import authReducer from './authReducer';
import industriesReducer from './industriesReducer';
import packagesReducer from './packagesReducer';
import { reducer as reduxForm } from 'redux-form'; // rename reducer to reduxForm to avoid confusion

const rootReducer = combineReducers({
  industries: industriesReducer,
  packages: packagesReducer,
  auth: authReducer,
  form: reduxForm // provided by redux-form
});

export default rootReducer;