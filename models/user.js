// // C:\Program Files\PostgreSQL\12\data
const bcrypt = require("bcrypt");
const { pool } = require("../database/config");
module.exports = {
  loginFields: [
    { label: "Login", name: "login" },
    { label: "Password", name: "password", type: "password" }
  ],
  registerFields: [
    { label: "Login", name: "login" },
    { label: "Mail", name: "mail", type: "mail" },
    { label: "Password", name: "password", type: "password" }
  ],
  async exist({ login, password, mail }) {
    const query = `
    SELECT login FROM users
    WHERE login=$1
  `;
    const resault = await pool.query(query, [login]);
    return resault.rowCount !== 0;
  },
  async register({ login, password, mail }) {
    const hashedPass = await bcrypt.hash(password, 10);
    const query = `
    INSERT INTO users (login,password,mail)
    VALUES ($1,$2,$3)
    RETURNING id
    `;
    let data = await pool.query(query, [login, hashedPass, mail]);
    return data.rows[0].id;
  },
  async login({ login, password }) {
    const query = `
    SELECT login, password, id, avatar FROM users
    WHERE login=$1 
  `;
    const resault = await pool.query(query, [login]);
    if (resault.rowCount === 0) {
      return {
        succes: false,
        userID: null
      };
    } else {
      let user = resault.rows[0];
      let hash = user.password;
      return {
        succes: await bcrypt.compare(password, hash),
        userID: user.id,
        avatar: user.avatar
      };
    }
  }
};
