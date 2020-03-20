exports.redirectLogin = (req, res, next) => {
  if (req.session.user && req.cookies.session_sid) {
    next();
    console.log("logged in");
  } else {
    res.redirect("/login");
  }
};

exports.redirectMain = (req, res, next) => {
  console.log("REDIRECT main", req.session.user && req.cookies.session_sid);
  if (req.session.user && req.cookies.session_sid) {
    const { id } = req.session.user;
    res.redirect(`/users/${id}/books`);
  } else {
    next();
  }
};
// exports.clearOldCookies = (req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_id");
//   }
//   next();
// };
