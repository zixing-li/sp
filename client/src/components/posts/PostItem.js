import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deletePost,
  addLikePost,
  removeLikePost
} from "../../actions/postActions";
import Timestamp from "react-timestamp";
// import {
//   Header,
//   Segment,
//   Button,
//   Icon,
//   List,
//   Form,
//   Responsive
// } from "semantic-ui-react";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLikePost(id);
  }

  onUnlikeClick(id) {
    this.props.removeLikePost(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3 shadow p-3 bg-white rounded">
        <div className="ml-5 mr-5">
          <Link to={`/post/${post._id}`}>
            <h2 className="mt-4 mb-3">{post.title}</h2>
          </Link>
          <div className="mt-3 mb-3">
            <i className="fas fa-user" /> {post.name}
            <i className="far fa-clock ml-5" />{" "}
            <Timestamp time={Date.parse(post.date) / 1000} format="full" />{" "}
          </div>
          <p className="lead mb-4">{post.bodyText}</p>
          <Link to={`/post/${post._id}`} className="btn btn-light mr-1">
            <i className="fas fa-comment" /> {post.comments.length}
          </Link>
          {showActions ? (
            <span>
              <button
                onClick={this.onLikeClick.bind(this, post._id)}
                type="button"
                className="btn btn-light mr-1">
                <i
                  className={classnames("fas fa-thumbs-up", {
                    "text-info": this.findUserLike(post.likes)
                  })}
                />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button
                onClick={this.onUnlikeClick.bind(this, post._id)}
                type="button"
                className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              {post.user === auth.user.id ? (
                <span className="float-right">
                  {" "}
                  <Link to={`/#`} className="btn btn-outline-info mr-1">
                    Edit
                  </Link>{" "}
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-outline-danger mr-1">
                    Delete
                  </button>
                </span>
              ) : null}
            </span>
          ) : null}
          <button type="button" className="btn btn-light mr-1">
            {post.category}
          </button>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLikePost: PropTypes.func.isRequired,
  removeLikePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    deletePost,
    addLikePost,
    removeLikePost
  }
)(PostItem);
