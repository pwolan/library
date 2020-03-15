const express = require("express");
const router = express.Router();

// router.use("/cos", require("./constroller"));
router.use("/books", require("./books"));
router.get("/", (req, res) => {
  res.redirect("/books");
});

module.exports = router;
