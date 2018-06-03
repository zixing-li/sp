import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts, sort } = this.props;

    return posts
      .sort((a, b) => {
        switch (sort.value) {
          case "unpopular":
            return a.likes.length - b.likes.length;
          case "oldest":
            return Date.parse(a.date) - Date.parse(b.date);
          case "newest":
            return Date.parse(b.date) - Date.parse(a.date);
          default:
            return b.likes.length - a.likes.length;
        }
      })
      .map(post => <PostItem key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
