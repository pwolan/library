const express = require("express");
const router = express.Router();
const redirectLogin = require("../middlewares/authorisation").redirectLogin;

router.get("/", (req, res) => {
  res.end("Index page!");
  // res.redirect("/books");
});
router.use("/books", redirectLogin, require("./books.controller"));
router.use("/", require("./users.controller"));
module.exports = router;
