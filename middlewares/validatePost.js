const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.bodyText = !isEmpty(data.bodyText) ? data.bodyText : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (
    !Validator.isLength(data.bodyText, {
      min: 1,
      max: 300
    })
  ) {
    errors.bodyText = "Post must be between 1 and 300 characters";
  }

  if (
    !Validator.isLength(data.title, {
      min: 1,
      max: 100
    })
  ) {
    errors.title = "Post must be between 1 and 100 characters";
  }

  if (Validator.isEmpty(data.bodyText)) {
    errors.bodyText = "Text field is required";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
