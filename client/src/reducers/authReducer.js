import { FETCH_USER } from '../actions/types';

const initialState = null; // don't know if user's logged in yet

export default function(state = initialState, action) {
  console.log(action);
  switch(action.type) {
    case FETCH_USER:
      console.log("reducer - fetch user");
      return action.payload || false; // if empty string, false
    default: 
      console.log("reducer - default");
      return state;
  }
}