const express = require("express");
const router = express.Router();
const redirectLogin = require("../middlewares/authorisation").redirectLogin;

router.use("/users/:userID", redirectLogin, require("./books.controller"));
router.use("/", require("./users.controller"));
router.get("/", redirectLogin, (req, res) => {
  console.log("SLASH");
  const { id } = req.session.user;
  res.redirect(`/users/${id}/books`);
});
module.exports = router;
