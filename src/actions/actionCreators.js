export const populateIndustryPage = () => {
  const industryArray = [];
  // console.log(this.state.industry)
  while (industryArray.length<12) {
    industryArray.push(this.state.industry)
  };

  return( 
    industryArray.map((industry,i)=>{
      return (<div key={i}>{industry}</div>);
    })
  )
};