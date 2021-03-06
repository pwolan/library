const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const { sessionStore } = require("./database/config");

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
    store: sessionStore,
    key: "session_sid",
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 60000000
    }
  })
);

//add controller
app.use(require("./controllers/index.controller.js"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listen on " + port));
