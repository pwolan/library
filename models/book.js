const db = require("../database/db").books;

exports.add = ({ title, author, cover }) => {
  let insertData = {
    title,
    author,
    cover,
    date: new Date().getTime()
  };
  db.insert(insertData, (err, newDoc) => {
    console.log(newDoc);
  });
};
exports.getAll = callback => {
  db.find({}, callback);
};
exports.remove = id => {
  db.remove({ _id: id }, (err, n) => {
    if (err) console.log(err);
    console.log(n);
  });
};
exports.getOne = (id, callback) => {
  db.findOne({ _id: id }, callback);
};

exports.update = (id, { title, author, cover }) => {
  db.update(
    { _id: id },
    {
      title,
      author,
      cover
    },
    {},
    (err, num) => {
      if (err) console.log(err);
    }
  );
};

exports.fields = [
  { label: "Tytuł", name: "title" },
  { label: "Autor", name: "author" },
  { label: "Okładka", name: "cover" }
];
