const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/account", (req, res) => {
  console.log(req.session.user);
  let fields = User.accountFields.map(field => ({
    ...field,
    value: req.session.user[field.name]
  }));
  let form = {
    action: "/account/basic",
    method: "POST",
    fields: fields,
    header: "Basic Informations",
    buttonCaption: "Edit"
  };
  let passwordFields = [
    { label: "Old password", name: "password", type: "password" },
    { label: "New password", name: "newpassword1", type: "password" },
    { label: "Repeat new password", name: "newpassword2", type: "password" }
  ];
  let passwordForm = {
    action: "/account/password",
    method: "POST",
    fields: passwordFields,
    header: "Change Password",
    buttonCaption: "Change Password"
  };
  res.render("user/account", { form, passwordForm });
});

router.post("/account/basic", async (req, res) => {
  const { id } = req.session.user;
  let newUserData = await User.edit(id, { ...req.body });
  req.session.user = newUserData;
  res.redirect("./");
});

router.post("/account/password", async (req, res) => {
  console.log(req.body);
  const { login } = req.session.user;
  const { password, newpassword1, newpassword2 } = req.body;
  const { user, succes } = await User.login({login, password});
  console.log(succes);
  if (succes) {
    if (newpassword1 == newpassword2) {
      console.log("changing pass");
      await User.editPassword(user.id, newpassword1);
      res.redirect("./");
    } else {
      res.redirect("./");
    }
  } else {
    //bad pass
    res.redirect("./");
  }
});

module.exports = router;
