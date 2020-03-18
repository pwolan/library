const express = require("express");
const router = express.Router();
const { pool } = require("../database/config");
const User = require("../models/user");
let fields = [
  { label: "Login", name: "login" },
  { label: "Mail", name: "mail", type: "mail" },
  { label: "Password", name: "password", type: "password" }
];
let fieldsLogin = [
  { label: "Login", name: "login" },
  { label: "Password", name: "password", type: "password" }
];
router
  .route("/register")
  .get((req, res) => {
    let form = {
      action: "/register",
      method: "POST",
      fields,
      buttonCaption: "Register"
    };
    res.render("auth/register", { form });
  })
  .post((req, res) => {
    console.log(req.body);
    //TODO
    res.end();
  });

router.get("/login", (req, res) => {
  let form = {
    action: "/login",
    method: "POST",
    fields: fieldsLogin,
    buttonCaption: "Log in"
  };
  // pool.query(
  //   "INSERT INTO books (author, title, cover) VALUES ($1,$2,$3)",
  //   ["Autor", "Tytuł", "urlll"],
  //   (err, data) => {
  //     console.log(data);
  //     res.end(data);
  //   }
  // );
  pool.query("SELECT * FROM books", (err, data) => {
    console.log(data);
    res.end();
  });

  // res.render("auth/login", { form });
});

module.exports = router;
