import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import uuidv1 from "uuid/v1";
import { Form, Header, Icon } from "semantic-ui-react";
import categoryDropDown from "./CategoryDropDown";

class PostForm extends Component {
  //State to keep track of the post details.
  state = {
    title: "",
    bodyText: "",
    errors: {},
    category: this.props.categories.selectedCategory.name,
    file: null
  };

  //Sets the value of the chosen category in the dropdown menu
  setPostCategory = e => {
    this.setState({ category: e.target.value });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      title: this.state.title,
      bodyText: this.state.bodyText,
      name: user.name,
      avatar: user.avatar,
      category: this.state.category
      // file: this.state.file
    };

    this.props.addPost(newPost, this.props.history);
    this.setState({ title: "", bodyText: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange(event) {
    this.setState({ file: event.target.files[0] }); //event.target.files returns a FileList
  }

  render() {
    const { title, bodyText, errors } = this.state;

    return (
      <div className="container">
        <div className="post-form mt-3 mb-3">
          <div className="card card-info">
            <div className="card-header bg-info text-white">Add Post</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="postCategory">Choose Category</label>
                  <select
                    required
                    className="form-control"
                    id="postCategory"
                    name="postCategory"
                    value={this.state.category}
                    onChange={this.setPostCategory}>
                    {categoryDropDown.map((category, index) => (
                      <option key={index}>{category.text}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Post Title</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="post-title"
                    placeholder="Post Title"
                    name="title"
                    value={title}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postContent">Post Content</label>
                  <textarea
                    className="form-control"
                    id="body-text"
                    rows="3"
                    placeholder="Post Content"
                    name="bodyText"
                    value={bodyText}
                    onChange={this.onChange}
                  />
                </div>
                <button type="submit" className="btn btn-outline-info mr-1">
                  Add Post
                </button>
                <input
                  onChange={this.onFileChange.bind(this)}
                  type="file"
                  accept="image/*"
                />{" "}
                Add image
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(PostForm));
