import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import surveysReducer from "./surveysReducer";
import industriesReducer from "./industriesReducer";
import packagesReducer from "./packagesReducer";
import { reducer as reduxForm } from "redux-form"; // rename reducer to reduxForm to avoid confusion

const rootReducer = combineReducers({
  industries: industriesReducer,
  packages: packagesReducer,
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  form: reduxForm, // provided by redux-form
  surveys: surveysReducer
});

export default rootReducer;
