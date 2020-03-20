const express = require("express");
const router = express.Router();
const Book = require("../models/book");



router.get("/books", async (req, res) => {
  console.log(req.url);
  let user = req.session.user;
  let books = await Book.getAll(user.id);
  res.render("books/index", { books, user });
});

router
  .route("/new")
  .post((req, res) => {
    const { title, author, cover } = req.body;
    const { id } = req.session.user;
    Book.add(id, { title, author, cover });
    let newRoute = req.body.route || "books";
    res.redirect(newRoute);
  })
  .get((req, res) => {
    let fields = Book.fields;
    const { id } = req.session.user;
    let form = {
      action: `new`,
      method: "POST",
      fields,
      buttonCaption: "Add",
      secondButton: {
        caption: "Add and continue",
        value: "new"
      }
    };

    res.render("books/new/", { form });
  });

router.get("/remove/:id", (req, res) => {
  const { id } = req.params;
  Book.remove(id);
  res.redirect("../books");
});

router
  .route("/edit/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const book = await Book.getOne(id);
    let newFields = Book.fields.map(({ label, name }) => ({
      label,
      name,
      value: book[name]
    }));
    let form = {
      fields: newFields,
      buttonCaption: "Edit",
      secondButton: {
        href: "books",
        caption: "Anuluj"
      },
      action: ``,
      method: "POST"
    };

    res.render("books/edit/", { book, form });
  })
  .post((req, res) => {
    const { title, author, cover } = req.body;
    const { id } = req.params;
    Book.update(id, { title, author, cover });
    res.redirect("../books");
  });

module.exports = router;
