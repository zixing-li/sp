const initialState = {
  industryList: [
    "General",
    "Design",
    "Web Development",
    "Consulting",
    "Banking",
    "Fitness",
    "Social Advice",
    "Gadgets",
    "College Application"
  ]
}

export default function(state = initialState, action) {
  switch(action.type) {
    default: 
      return state;
  }
}