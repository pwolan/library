const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  Book.getAll((err, books) => {
    res.render("books/index", { books });
  });
});

router.post("/add", (req, res) => {
  console.log(req.body);
  const { title, author, cover } = req.body;
  Book.add(title, author, cover);
  res.redirect("/");
  // res.render("books/bookDetails", { name });
});

router.get("/new", (req, res) => {
  let fields = [
    { label: "Tytuł", name: "title" },
    { label: "Autor", name: "author" },
    { label: "Okładka", name: "cover" }
  ];
  res.render("books/new/book_new", { form: fields });
});
module.exports = router;
