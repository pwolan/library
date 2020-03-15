const Datastore = require("nedb");
const Database = new Datastore({
  filename: "./database/books.db",
  autoload: true
});

module.exports = Database;
