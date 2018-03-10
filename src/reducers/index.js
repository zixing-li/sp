import { combineReducers } from "redux";
import IndustriesReducer from './IndustriesReducer'

const rootReducer = combineReducers({
  industries: IndustriesReducer,
});

export default rootReducer;