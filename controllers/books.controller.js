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
  const { title, author, cover } = req.body;
  Book.add({title, author, cover});
  res.redirect("/");
});

router.get("/new", (req, res) => {
  let fields = Book.fields;
  let form = {
    action: "/books/add",
    method: "POST",
    fields,
    buttonCaption: "Add"
  };

  res.render("books/new/", { form });
});

router.get("/remove/:id", (req, res) => {
  const { id } = req.params;
  Book.remove(id);
  res.redirect("/");
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  Book.getOne(id, (err, book) => {
    let newFields = Book.fields.map(({ label, name }) => ({
      label,
      name,
      value: book[name]
    }));
    let form = {
      fields: newFields,
      buttonCaption: "Edit",
      action: `/books/editaction/${id}`,
      method: "POST"
    };

    res.render("books/edit/", { book, form });
  });
});

router.post("/editaction/:id", (req, res) => {
  const { title, author, cover } = req.body;
  const { id } = req.params;
  Book.update(id, {title, author, cover});
  res.redirect("/");
});

module.exports = router;
