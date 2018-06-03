// Post routes
// const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport"); // to protect routes

// const Post = mongoose.model('posts'); // get access to mongoose model class. Written this way to avoid errors in tests, therefore not use require('surveys')

const Post = require("../models/Post");
const Profile = require("../models/Profile");

// Validation
const validatePostInput = require("../middlewares/validatePost");

module.exports = app => {
  // @route   GET api/posts/test
  // @desc    Tests post route
  // @access  Public
  app.get("/api/posts/test", (req, res) =>
    res.json({
      msg: "Posts Works"
    })
  );

  // @route   GET api/posts
  // @desc    Get posts
  // @access  Public
  app.get("/api/posts", (req, res) => {
    // get all posts
    Post.find()
      .sort({
        date: -1
      })
      .then(posts => res.json(posts)) // show results
      .catch(err =>
        res.status(404).json({
          nopostsfound: "No posts found"
        })
      );
  });

  // @route   GET api/posts/:id
  // @desc    Get post by id
  // @access  Public
  app.get("/api/posts/:id", (req, res) => {
    // get a single post
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err =>
        res.status(404).json({
          nopostfound: "No post found with that ID"
        })
      );
  });

  // @route   POST api/posts
  // @desc    Create post
  // @access  Private
  app.post(
    "/api/posts",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);

      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }

      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });

      newPost.save().then(post => res.json(post));
    }
  );

  // @route   DELETE api/posts/:id
  // @desc    Delete post
  // @access  Private
  app.delete(
    "/api/posts/:id",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOne({
        // didn't add Profile model but still works, why?
        user: req.user.id
      }).then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorized: "User not authorized"
              });
            }

            // Delete
            post.remove().then(() =>
              res.json({
                success: true
              })
            );
          })
          .catch(err =>
            res.status(404).json({
              postnotfound: "No post found"
            })
          );
      });
    }
  );

  // @route   POST api/posts/like/:id
  // @desc    Like post
  // @access  Private
  app.post(
    "/api/posts/like/:id",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id) // post.likes is an array, filter will look through it
                .length > 0
            ) {
              return res.status(400).json({
                alreadyliked: "User already liked this post"
              });
            }

            // Add user id to likes array
            post.likes.unshift({
              // unshift will add to beginning
              user: req.user.id
            });

            post.save().then(post => res.json(post)); // use save so that the change is saved to the database. without it it would have only existed on the server
          })
          .catch(err =>
            res.status(404).json({
              postnotfound: "No post found"
            })
          );
      });
    }
  );

  // @route   POST api/posts/unlike/:id
  // @desc    Unlike post
  // @access  Private
  app.post(
    "/api/posts/unlike/:id",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0 // not liked the post yet
            ) {
              return res.status(400).json({
                notliked: "You have not yet liked this post"
              });
            }

            // Get remove index so we know which like to remove
            const removeIndex = post.likes // post.likes is the entire array of likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            // Splice out of array
            post.likes.splice(removeIndex, 1);

            // Save
            post.save().then(post => res.json(post));
          })
          .catch(err =>
            res.status(404).json({
              postnotfound: "No post found"
            })
          );
      });
    }
  );

  // @route   POST api/posts/comment/:id
  // @desc    Add comment to post
  // @access  Private
  app.post(
    "/api/posts/comment/:id", // :id is post id
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);

      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }

      Post.findById(req.params.id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          };

          // Add to comments array
          post.comments.unshift(newComment);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    }
  );

  // @route   DELETE api/posts/comment/:id/:comment_id
  // @desc    Remove comment from post
  // @access  Private
  app.delete(
    "/api/posts/comment/:id/:comment_id",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if comment exists
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0 // if true, then the comment we are deleting doesn't exist
          ) {
            return res.status(404).json({
              commentnotexists: "Comment does not exist"
            });
          }

          // Get remove index
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

          // Splice comment out of array
          post.comments.splice(removeIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    }
  );

  // @route   POST api/posts/comment/like/:id/:comment_id
  // @desc    Like comment
  // @access  Private
  app.post(
    "/api/posts/comment/like/:id/:comment_id",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // Check to see if comment exists
            if (
              post.comments.filter(
                comment => comment._id.toString() === req.params.comment_id
              ).length === 0 // if true, then the comment we are liking doesn't exist
            ) {
              return res.status(404).json({
                commentnotexists: "Comment does not exist"
              });
            }

            // Get comment index (in the comments array)
            const commentIndex = post.comments
              .map(item => item._id.toString())
              .indexOf(req.params.comment_id);

            if (
              post.comments[commentIndex].likes.filter(
                like => like.user.toString() === req.user.id
              ).length > 0 // post.comments.likes is an array, filter will look through it
            ) {
              return res.status(400).json({
                alreadyliked: "User already liked this comment"
              });
            }

            // Add user id to likes array
            post.comments[commentIndex].likes.unshift({
              // unshift will add to beginning
              user: req.user.id
            });

            post.save().then(post => res.json(post)); // use save so that the change is saved to the database. without it it would have only existed on the server
          })
          .catch(err =>
            res.status(404).json({
              postnotfound: "No post found"
            })
          );
      });
    }
  );

  // @route   POST api/posts/comment/unlike/:id/:comment_id
  // @desc    Unlike comment
  // @access  Private
  app.post(
    "/api/posts/comment/unlike/:id/:comment_id",
    passport.authenticate("jwt", {
      session: false
    }),

    (req, res) => {
      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // Check to see if comment exists
            if (
              post.comments.filter(
                comment => comment._id.toString() === req.params.comment_id
              ).length === 0 // if true, then the comment we are liking doesn't exist
            ) {
              return res.status(404).json({
                commentnotexists: "Comment does not exist"
              });
            }

            // Get comment index (in the comments array)
            const commentIndex = post.comments
              .map(item => item._id.toString())
              .indexOf(req.params.comment_id);

            // Get remove index so we know which like to remove
            const removeIndex = post.comments[commentIndex].likes // .likes is the entire array of likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            if (
              post.comments[commentIndex].likes.filter(
                like => like.user.toString() === req.user.id
              ).length === 0 // not liked the comment yet
            ) {
              return res.status(400).json({
                notliked: "You have not yet liked this comment"
              });
            }

            // Splice out of array
            post.comments[commentIndex].likes.splice(removeIndex, 1);

            // Save
            post.save().then(post => res.json(post));
          })
          .catch(err =>
            res.status(404).json({
              postnotfound: "No post found"
            })
          );
      });
    }
  );
};
