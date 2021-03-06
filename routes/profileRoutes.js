const mongoose = require("mongoose");
const passport = require("passport"); // use this for protected routes

const validateProfileInput = require("../middlewares/validateProfile");
const validateExperienceInput = require("../middlewares/validateExperience");
const validateEducationInput = require("../middlewares/validateEducation");

// load Profile and User models
const User = mongoose.model("users");
// const Profile = mongoose.model('profiles');
const Profile = require("../models/Profile");

module.exports = app => {
  app.get("/api/profile/test", (req, res) => {
    res.json({
      msg: "Profile works"
    });
  });

  app.get(
    "/api/profile",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const errors = {};

      Profile.findOne({
        user: req.user.id
      })
        .populate("user", ["name", "avatar"]) // include user id, name, and avatar in the profile
        .then(profile => {
          if (!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
          }
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    }
  );

  app.get("/api/profile/all", (req, res) => {
    const errors = {};

    Profile.find() // not findOne because we need all profiles
      .populate("user", ["name", "avatar"]) // include user id, name, and avatar in the profile
      .then(profiles => {
        //plural!
        if (!profiles) {
          errors.noprofile = "There are no profiles";
          return res.status(404).json();
        }
        res.json(profiles);
      })
      .catch(err =>
        res.status(404).json({
          profile: "There are no profiles"
        })
      );
  });

  // get profile by handle
  app.get("/api/profile/handle/:handle", (req, res) => {
    // public route therefore no need for passport middleware
    const errors = {};

    Profile.findOne({
      handle: req.params.handle
    }) // params.handle will be from :handle
      .populate("user", ["name", "avatar"]) // include user id, name, and avatar in the profile
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  });

  // get profile by user
  app.get("/api/profile/user/:user_id", (req, res) => {
    // public route therefore no need for passport middleware
    const errors = {};

    Profile.findOne({
      handle: req.params.user_id
    }) // params.handle will be from :handle
      .populate("user", ["name", "avatar"]) // include user id, name, and avatar in the profile
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({
          profile: "There is no profile for this user"
        })
      );
  });

  // Create or Update user profile
  app.post(
    "/api/profile",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const { errors, isValid } = validateProfileInput(req.body);

      // check validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      // Get fields
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;

      // Skills - Spilt into array
      if (typeof req.body.skills !== "undefined") {
        profileFields.skills = req.body.skills.split(",");
      }

      // Social
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram;

      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        if (profile) {
          // this will be an Update
          Profile.findOneAndUpdate(
            {
              user: req.user.id
            },
            {
              $set: profileFields
            },
            {
              new: true
            }
          ).then(profile => res.json(profile));
        } else {
          // this will be an create
          // check to see if the handle exists
          Profile.findOne({
            handle: profileFields.handle
          }).then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }
            // Save profile
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          });
        }
      });
    }
  );

  // add experience
  app.post(
    "/api/profile/experience",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const { errors, isValid } = validateExperienceInput(req.body);

      // check validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      Profile.findOne({
        user: req.user.id // comes from user token
      }).then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add to exp array
        profile.experience.unshift(newExp); // unshift to add to beginning, push to add to end

        profile.save().then(profile => res.json(profile));
      });
    }
  );

  // add education
  app.post(
    "/api/profile/education",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      const { errors, isValid } = validateEducationInput(req.body);

      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        const newSub = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add to education array
        profile.education.unshift(newSub);

        profile.save().then(profile => res.json(profile));
      });
    }
  );

  // add category subscription
  app.post(
    "/api/profile/subscription/category",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOne({
        user: req.user.id
      }).then(profile => {
        const newSub = {
          category: req.body.category
        };

        // Add to subscription array
        profile.subscription.subscribedCategories.unshift(newSub.category);

        profile.save().then(profile => res.json(profile));
      });
    }
  );

  // @route   DELETE api/profile/experience/:exp_id
  // @desc    Delete experience from profile
  // @access  Private
  app.delete(
    "/api/profile/experience/:exp_id",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOne({
        user: req.user.id
      })
        .then(profile => {
          // Get remove index
          const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

          // Splice out of array
          profile.experience.splice(removeIndex, 1);

          // Save
          profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
    }
  );

  // @route   DELETE api/profile/education/:edu_id
  // @desc    Delete education from profile
  // @access  Private
  app.delete(
    "/api/profile/education/:edu_id",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOne({
        user: req.user.id
      })
        .then(profile => {
          // Get remove index
          const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);

          // Splice out of array
          profile.education.splice(removeIndex, 1);

          // Save
          profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
    }
  );

  // delete category subscription
  app.delete(
    "/api/profile/subscription/category/:sub_id",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOne({
        user: req.user.id
      })
        .then(profile => {
          // Get remove index
          const removeIndex = profile.subscription.subscribedCategories
            .map(item => item.id)
            .indexOf(req.params.exp_id);

          // Splice out of array
          profile.subscription.subscribedCategories.splice(removeIndex, 1);

          // Save
          profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
    }
  );

  // @route   DELETE api/profile
  // @desc    Delete user and profile
  // @access  Private
  app.delete(
    "/api/profile",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      Profile.findOneAndRemove({
        user: req.user.id
      }).then(() => {
        User.findOneAndRemove({
          // this deletes the user too
          _id: req.user.id
        }).then(() =>
          res.json({
            success: true
          })
        );
      });
    }
  );
};
