import { CHANGE_SORT } from "../actions/types";

// const initialState = {
//   sort: "newest"
// };

// export default function sort(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_SORT:
//       const newValue = action.value;
//       return {
//         ...state,
//         sort: newValue
//       };
//     default:
//       return state;
//   }
// }

export default function(state = { value: "newest" }, action) {
  switch (action.type) {
    case CHANGE_SORT:
      return action.value;
    default:
      return state;
  }
}
