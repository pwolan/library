const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

//template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(require("./controllers/index.js"));

app.listen("3000", () => console.log("Listen on 3000"));
