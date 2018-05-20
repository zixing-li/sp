// import { FETCH_USER } from "../actions/types";

// const initialState = null; // don't know if user's logged in yet

// export default function(state = initialState, action) {
//   console.log(action);
//   switch(action.type) {
//     case FETCH_USER:
//       console.log("auth reducer - fetch user");
//       return action.payload || false; // if empty string, false
//     default:
//       console.log("auth reducer - default");
//       return state;
//   }
// }

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    // case SET_CURRENT_USER:
    //   return {
    //     ...state,
    //     isAuthenticated: !isEmpty(action.payload),
    //     user: action.payload
    //   };
    // case FETCH_USER:
    //   console.log("auth reducer - fetch user");
    //   return action.payload || false; // if empty string, false
    default:
      console.log("auth reducer - default");
      return state;
  }
}
