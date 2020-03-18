const Datastore = require("nedb");
const Database = new Datastore({
  filename: "./database/books.db",
  autoload: true
});

exports.books = Database;

exports.users = new Datastore({
  filename: "./database/users.db",
  autoload: true
});
