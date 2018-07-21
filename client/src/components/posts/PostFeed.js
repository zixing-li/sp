import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts, sort, filter } = this.props;

    if (filter.value == "all") {
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
    } else {
      return posts
        .filter(post => post.category === filter.value)
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
        .map(post => (
          <PostItem key={post._id} post={post} showActions={false} />
        ));
    }
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
