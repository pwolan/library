const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");


//template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(__dirname + "/public"));

//cookies and session
app.use(cookieParser());
app.use(
  session({
    key: "special_key",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);
// app.use(require("./middlewares/users").clearOldCookies);

//add controller
app.use(require("./controllers/index.controller.js"));

app.listen("3000", () => console.log("Listen on 3000"));
