// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { changeFilterAction } from "../../actions/filterActions";
// import { Select } from "semantic-ui-react";

// // options are
// const options = [{ value: "all", text: "All" }];

// class FilterBy extends Component {
//   //Keeps track of the value of the dropdown filter menu.
//   state = {
//     value: ""
//   };

//   //Sets the value of the dropdown filter menu.
//   setValue = (e, data) => {
//     this.setState({ value: data.value });
//     //Dispatches changeFilter action to keep track of the value of the dropdown filter menu
//     //in Redux.
//     this.props.changeFilterAction({ value: data.value });
//   };

//   render() {
//     const { value } = this.state;
//     return (
//       <div className="filter">
//         <Select
//           onChange={this.setValue}
//           color="teal"
//           name="filter"
//           placeholder="Filter By"
//           options={options}
//           value={value}
//         />
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ filter }) => ({
//   filter
// });

// export default connect(
//   mapStateToProps,
//   { changeFilterAction }
// )(FilterBy);

// WIP, not yet written functions in this component
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCategories,
  fetchPostsCategory
} from "../../actions/filterActions";
import SortBy from "./SortBy";
import { Grid, Button, Responsive } from "semantic-ui-react";

class Menu extends Component {
  //Get all the categories, to display in the Menu.
  componentDidMount() {
    this.props.fetchCategories();
  }

  //Dispatches action to get the posts for a category, when clicking on a Menu Button.
  getPostsByCategory = category => {
    this.props.fetchPostsCategory(category);
  };

  render() {
    const { receiveCategories } = this.props;
    return (
      <div className="categories">
        <Responsive as={Grid} columns={6} minWidth={768}>
          <Grid.Column>
            <Link to="/">
              <Button
                className="menu-btn"
                size="tiny"
                compact
                basic
                color="teal">
                All
              </Button>
            </Link>
          </Grid.Column>
          {receiveCategories.length > 0 &&
            receiveCategories.map(category => (
              <Grid.Column key={category.path}>
                <Link to={`/${category.name}`}>
                  <Button
                    className="menu-btn"
                    onClick={() => this.getPostsByCategory(category.name)}
                    size="tiny"
                    compact
                    basic
                    color="teal">
                    {category.name}
                  </Button>
                </Link>
              </Grid.Column>
            ))}
          <Grid.Column>
            <SortBy />
          </Grid.Column>
        </Responsive>
        <Responsive as={Grid} columns={1} maxWidth={767}>
          <SortBy />
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = ({ receiveCategories }) => ({
  receiveCategories
});

//Pass actions directly into connect method, so mapDispatchToProps function
//isn't needed, and less code is needed.

export default connect(
  mapStateToProps,
  {
    fetchCategories,
    fetchPostsCategory
  }
)(Menu);
