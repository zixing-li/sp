import { SELECT_INDUSTRY } from '../actions/types';

const initialState = {
  industryList: [
    {name: "General"},
    {name: "Design"},
    {name: "Web Development"},
    {name: "Consulting"},
    {name: "Banking"},
    {name: "Fitness"},
    {name: "Social Advice"},
    {name: "Gadgets"},
    {name: "College Application"}
  ],
  selectedIndustry: {
    name: ''
  }
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SELECT_INDUSTRY:
      console.log("industries reducer - select industry:" + action.selectedIndustry.name);
      return {...state, selectedIndustry: action.selectedIndustry};
    default: 
      console.log("industries reducer - default")
      return state;
  }
}