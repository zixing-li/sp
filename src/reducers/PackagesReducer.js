let generatePackageList = function() {
  let packageList = [];
  for (let i = 0; i<9; i++) {
    packageList.push({
      name: "Package#"+i
    })
  }
  return packageList;
}

const initialState = {
  packageList: generatePackageList(),
  currentPackage: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    default: 
      return state;
  }
}