const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");
const passport = require("passport"); // to protect routes

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  // endpoint: "s3.us-east-2.amazonaws.com",
  // endpoint: "s3.us-east-1.amazonaws.com",
  signatureVersion: "v4",
  region: "us-east-1"
});

module.exports = app => {
  app.get(
    "/api/upload",
    passport.authenticate("jwt", {
      session: false
    }),
    // requireLogin,
    (req, res) => {
      const key = `${req.user.id}/${uuid()}.jpeg`;
      // console.log("res", res);

      s3.getSignedUrl(
        "putObject",
        {
          Bucket: "sp-bucket-0130",
          ContentType: "image/jpeg",
          Key: key
        },
        (err, url) => {
          res.send({ key, url });
          console.log("user.id", req.user.id);
          console.log("key", key);
          console.log("url", url);
        }
      );
    }
  );
};
