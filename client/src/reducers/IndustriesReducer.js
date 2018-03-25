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
    case 'SELECT_INDUSTRY':
      console.log("reducer - select industry:" + action.selectedIndustry.name);
      return {...state, selectedIndustry: action.selectedIndustry};
    default: 
      return state;
  }
}