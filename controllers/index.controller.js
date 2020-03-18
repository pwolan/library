const express = require("express");
const router = express.Router();
const redirectLogin = require("../middlewares/users").redirectLogin;

// router.use("/cos", require("./controller"));
router.use("/books", require("./books.controller"));
router.get("/", (req, res) => {
  res.redirect("/books");
});
router.use("/", require("./users.controller"));
module.exports = router;
