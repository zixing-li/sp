import { CHANGE_FILTER } from "./types";

//Change sort post and sort comment
export const changeFilterAction = value => {
  return {
    type: CHANGE_FILTER,
    value: value
  };
};
