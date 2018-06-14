import { CHANGE_FILTER } from "../actions/types";

const initialState = {
  sort: "all"
};

export default function sort(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FILTER:
      const newValue = action.value;
      return {
        ...state,
        sort: newValue
      };
    default:
      return state;
  }
}
