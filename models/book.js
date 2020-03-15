const db = require("../database/db");

exports.add = (title, author, cover) => {
  db.insert({ title, author, cover }, (err, newDoc) => {
    console.log(newDoc);
  });
};
exports.getAll = callback => {
  db.find({}, callback);
};
