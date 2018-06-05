import { SELECT_CATEGORY } from "../actions/types";

const initialState = {
  categoryList: [
    { name: "General" },
    { name: "Design" },
    { name: "Web Development" },
    { name: "Consulting" },
    { name: "Banking" },
    { name: "Fitness" },
    { name: "Social Advice" },
    { name: "Gadgets" },
    { name: "College Application" }
  ],
  selectedCategory: {
    name: ""
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      console.log(
        "categories reducer - select category:" + action.selectedCategory.name
      );
      return { ...state, selectedCategory: action.selectedCategory };
    default:
      console.log("categories reducer - default");
      return state;
  }
}
