const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { redirectMain, redirectLogin } = require("../middlewares/authorisation");

router
  .route("/register")
  .get(redirectMain, (req, res) => {
    console.log(req.sessionID);
    let form = {
      action: "/register",
      method: "POST",
      fields: User.registerFields,
      buttonCaption: "Register"
    };
    res.render("auth/register", { form });
  })
  .post(async (req, res) => {
    console.log(req.body);
    //TODO express-validator
    const { login, password, mail } = req.body;
    if (login && password && mail) {
      try {
        if (!(await User.exist(login))) {
          const userID = await User.register({ login, password, mail });
          req.session.user = {
            id: userID,
            login,
            password,
          };
          res.status(200).redirect("/books");
        } else {
          console.log("Użytkownik już istnieje!");
          res.redirect("back");
        }
      } catch (err) {
        console.log(err);
        res.redirect("back");
      }
    } else {
      res.redirect("back");
    }
  });

router
  .route("/login")
  .get(redirectMain, (req, res) => {
    let form = {
      action: "/login",
      method: "POST",
      fields: User.loginFields,
      buttonCaption: "Log in"
    };

    res.render("auth/login", { form });
  })
  .post(async (req, res) => {
    const { login, password } = req.body;
    //TODO validation
    if (login && password) {
      const { succes, userID, avatar } = await User.login({ login, password });
      if (succes) {
        console.log(userID);
        req.session.user = {
          id: userID,
          login,
          password,
          avatar
        };
        res.redirect("/books");
      } else {
        res.end("złe hasło!");
        // res.redirect("/login");
      }
    }
  });

router.get("/logout", redirectLogin, (req, res) => {
  res.clearCookie("session_sid");
  req.session.destroy(err => {
    res.redirect("/login");
  });
});

module.exports = router;
