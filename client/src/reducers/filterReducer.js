import { CHANGE_FILTER } from "../actions/types";

export default function(state = { value: "all" }, action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.value;
    default:
      return state;
  }
}
