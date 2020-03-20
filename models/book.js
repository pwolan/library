const { pool } = require("../database/config");

exports.add = async (userID,{ title, author, cover }) => {
  let date = new Date().getDate();
  let query = `
    INSERT INTO books (title, author, cover, date, userID)
    VALUES ($1,$2,$3,$4,$5)
  `;
  await pool.query(query, [title, author, cover, date, userID]);
};
exports.getAll = async (userID) => {
  let query = `
    SELECT * FROM books
    where userID=$1
  `;
  let data = await pool.query(query,[userID]);
  return data.rows;
};
exports.remove = async id => {
  let query = `
    DELETE from books
    WHERE id=$1
  `;
  try {
    await pool.query(query, [id]);
  } catch (err) {
    console.log(err);
  }
};
exports.getOne = async id => {
  let query = `
  SELECT * FROM books
  WHERE id=${id}
 `;
  let data = await pool.query(query);
  return data.rows[0];
};

exports.update = async (id, { title, author, cover }) => {
  let query = `
    UPDATE books
    SET title=$1, author=$2, cover=$3
    WHERE id=$4
  `;
  await pool.query(query, [title, author, cover, id]);
};

exports.fields = [
  { label: "Tytuł", name: "title" },
  { label: "Autor", name: "author" },
  { label: "Okładka", name: "cover" }
];
