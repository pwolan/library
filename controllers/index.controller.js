const express = require("express");
const router = express.Router();
const redirectLogin = require("../middlewares/authorisation").redirectLogin;

router.get("/", redirectLogin, (req, res) => {
  res.redirect("/books");
});
router.use("/books", redirectLogin, require("./books.controller"));
router.use("/", require("./users.controller"));
module.exports = router;
