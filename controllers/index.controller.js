const express = require("express");
const router = express.Router();
const redirectLogin = require("../middlewares/authorisation").redirectLogin;

router.use("/books", redirectLogin, require("./books.controller"));
router.use("/", require("./auth.controller"));
router.use("/", require("./user.controller"));


router.get("/", redirectLogin, (req, res) => {
  res.redirect(`/books`);
});

module.exports = router;
