const initialState = {}

export default function(state = initialState, action) {
  switch(action.type) {
    // case 'SELECT_INDUSTRY':
    //   console.log("reducer - select industry:" + action.selectedIndustry.name);
    //   return {...state, selectedIndustry: action.selectedIndustry};
    default: 
      console.log("reducer - fetch user", action);
      return state;
  }
}