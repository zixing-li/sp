import { combineReducers } from "redux";
import IndustriesReducer from './IndustriesReducer'
import PackagesReducer from './PackagesReducer'

const rootReducer = combineReducers({
  industries: IndustriesReducer,
  packages: PackagesReducer,
});

export default rootReducer;