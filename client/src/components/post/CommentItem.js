import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  deleteComment,
  addLikeComment,
  removeLikeComment
} from "../../actions/postActions";
import Timestamp from "react-timestamp";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  onLikeClick(postId, commentId) {
    this.props.addLikeComment(postId, commentId);
  }

  onUnlikeClick(postId, commentId) {
    this.props.removeLikeComment(postId, commentId);
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
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-7">
            <p className="lead">{comment.text}</p>
            <button
              onClick={this.onLikeClick.bind(this, postId, comment._id)}
              type="button"
              className="btn btn-light mr-1">
              <i
                className={classnames("fas fa-thumbs-up", {
                  "text-info": this.findUserLike(comment.likes)
                })}
              />
              <span className="badge badge-light">{comment.likes.length}</span>
            </button>
            <button
              onClick={this.onUnlikeClick.bind(this, postId, comment._id)}
              type="button"
              className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
          <div className="col-md-3">
            <Timestamp time={Date.parse(comment.date) / 1000} format="full" />
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  addLikeComment: PropTypes.func.isRequired,
  removeLikeComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  deleteComment,
  addLikeComment,
  removeLikeComment
})(CommentItem);
