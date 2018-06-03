import { CHANGE_SORT } from "./types";

//Change sort post and sort comment
export const changeSortAction = value => {
  return {
    type: CHANGE_SORT,
    value: value
  };
};
