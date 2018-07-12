import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostFeed from "./PostFeed";
import SortBy from "../common/SortBy";
import FilterBy from "../common/FilterBy";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import { Link } from "react-router-dom";

class Posts extends Component {
  state = {};

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    // const { posts, loading, sort, filter, categories } = this.props;
    const sort = this.props.sort;
    const filter = this.props.filter;
    // const categories = this.props.categories;
    const { posts, loading } = this.props.post;

    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <PostFeed
          posts={posts}
          sort={sort}
          filter={filter}
          // categories={categories}
        />
      );
    }

    return (
      <div className="feed">
        <div className="container">
          <Link to="/posts/new">
            <button
              type="button"
              className="btn btn-danger fixed-round-button wobble"
              style={{ zIndex: 10 }}>
              <i className="fas fa-plus" />
            </button>
          </Link>
          <div className="row">
            <div className="col-md-12">
              <SortBy />
              <FilterBy />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
  // add sort
};

const mapStateToProps = state => ({
  post: state.post,
  sort: state.sort,
  filter: state.filter
  // categories: state.categories
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
