exports.redirectLogin = (req, res, next) => {
  if (req.session.user && req.cookies.session_sid) {
    next();
    console.log("logged in");
  } else {
    res.redirect("/login");
  }
};

exports.redirectMain = (req,res,next)=>{
  if(req.session.user && req.cookies.session_sid){
    res.redirect('/')
  }else {
    next()
  }
}
// exports.clearOldCookies = (req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_id");
//   }
//   next();
// };
