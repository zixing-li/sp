import { SELECT_CATEGORY } from "../actions/types";

const initialState = {
  categoryList: [
    { name: "General" },
    { name: "Web Development" },
    { name: "Consulting" },
    { name: "Banking" },
    { name: "Fitness" },
    { name: "Social Advice" },
    { name: "Gadgets" },
    { name: "College Application" },
    { name: "Accounting" },
    { name: "Airlines/Aviation" },
    { name: "Alternative Dispute Resolution" },
    { name: "Alternative Medicine" },
    { name: "Animation" },
    { name: "Apparel & Fashion" },
    { name: "Architecture & Planning" },
    { name: "Arts & Crafts" },
    { name: "Automotive" },
    { name: "Aviation & Aerospace" },
    { name: "Banking" },
    { name: "Biotechnology" },
    { name: "Broadcast Media" },
    { name: "Building Materials" },
    { name: "Business Supplies & Equipment" },
    { name: "Capital Markets" },
    { name: "Chemicals" },
    { name: "Civic & Social Organization" },
    { name: "Civil Engineering" },
    { name: "Commercial Real Estate" },
    { name: "Computer & Network Security" },
    { name: "Computer Games" },
    { name: "Computer Hardware" },
    { name: "Computer Networking" },
    { name: "Computer Software" },
    { name: "Construction" },
    { name: "Consumer Electronics" },
    { name: "Consumer Goods" },
    { name: "Consumer Services" },
    { name: "Cosmetics" },
    { name: "Dairy" },
    { name: "Defense & Space" },
    { name: "Design" },
    { name: "Education Management" },
    { name: "E-learning" },
    { name: "Electrical & Electronic Manufacturing" },
    { name: "Entertainment" },
    { name: "Environmental Services" },
    { name: "Events Services" },
    { name: "Executive Office" },
    { name: "Facilities Services" },
    { name: "Farming" },
    { name: "Financial Services" },
    { name: "Fine Art" },
    { name: "Fishery" },
    { name: "Food & Beverages" },
    { name: "Food Production" },
    { name: "Fundraising" },
    { name: "Furniture" },
    { name: "Gambling & Casinos" },
    { name: "Glass}, Ceramics & Concrete" },
    { name: "Government Administration" },
    { name: "Government Relations" },
    { name: "Graphic Design" },
    { name: "Health}, Wellness & Fitness" },
    { name: "Higher Education" },
    { name: "Hospital & Health Care" },
    { name: "Hospitality" },
    { name: "Human Resources" },
    { name: "Import & Export" },
    { name: "Individual & Family Services" },
    { name: "Industrial Automation" },
    { name: "Information Services" },
    { name: "Information Technology & Services" },
    { name: "Insurance" },
    { name: "International Affairs" },
    { name: "International Trade & Development" },
    { name: "Internet" },
    { name: "Investment Banking/Venture" },
    { name: "Investment Management" },
    { name: "Judiciary" },
    { name: "Law Enforcement" },
    { name: "Law Practice" },
    { name: "Legal Services" },
    { name: "Legislative Office" },
    { name: "Leisure & Travel" },
    { name: "Libraries" },
    { name: "Logistics & Supply Chain" },
    { name: "Luxury Goods & Jewelry" },
    { name: "Machinery" },
    { name: "Management Consulting" },
    { name: "Maritime" },
    { name: "Marketing & Advertising" },
    { name: "Market Research" },
    { name: "Mechanical or Industrial Engineering" },
    { name: "Media Production" },
    { name: "Medical Device" },
    { name: "Medical Practice" },
    { name: "Mental Health Care" },
    { name: "Military" },
    { name: "Mining & Metals" },
    { name: "Motion Pictures & Film" },
    { name: "Museums & Institutions" },
    { name: "Music" },
    { name: "Nanotechnology" },
    { name: "Newspapers" },
    { name: "Nonprofit Organization Management" },
    { name: "Oil & Energy" },
    { name: "Online Publishing" },
    { name: "Outsourcing/Offshoring" },
    { name: "Package/Freight Delivery" },
    { name: "Packaging & Containers" },
    { name: "Paper & Forest Products" },
    { name: "Performing Arts" },
    { name: "Pharmaceuticals" },
    { name: "Philanthropy" },
    { name: "Photography" },
    { name: "Plastics" },
    { name: "Political Organization" },
    { name: "Primary/Secondary" },
    { name: "Printing" },
    { name: "Professional Training" },
    { name: "Program Development" },
    { name: "Public Policy" },
    { name: "Public Relations" },
    { name: "Public Safety" },
    { name: "Publishing" },
    { name: "Railroad Manufacture" },
    { name: "Ranching" },
    { name: "Real Estate" },
    { name: "Recreational" },
    { name: "Facilities & Services" },
    { name: "Religious Institutions" },
    { name: "Renewables & Environment" },
    { name: "Research" },
    { name: "Restaurants" },
    { name: "Retail" },
    { name: "Security & Investigations" },
    { name: "Semiconductors" },
    { name: "Shipbuilding" },
    { name: "Sporting Goods" },
    { name: "Sports" },
    { name: "Staffing & Recruiting" },
    { name: "Supermarkets" },
    { name: "Telecommunications" },
    { name: "Textiles" },
    { name: "Think Tanks" },
    { name: "Tobacco" },
    { name: "Translation & Localization" },
    { name: "Transportation/Trucking/Railroad" },
    { name: "Utilities" },
    { name: "Venture Capital" },
    { name: "Veterinary" },
    { name: "Warehousing" },
    { name: "Wholesale" },
    { name: "Wine & Spirits" },
    { name: "Wireless" },
    { name: "Writing & Editing" }
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
