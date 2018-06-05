import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import surveysReducer from "./surveysReducer";
import categoriesReducer from "./categoriesReducer";
import packagesReducer from "./packagesReducer";
import sortReducer from "./sortReducer";
import { reducer as reduxForm } from "redux-form"; // rename reducer to reduxForm to avoid confusion

const rootReducer = combineReducers({
  categories: categoriesReducer,
  packages: packagesReducer,
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  form: reduxForm, // provided by redux-form
  surveys: surveysReducer,
  sort: sortReducer
});

export default rootReducer;
