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
  accountFields: [
    { label: "Login", name: "login" },
    { label: "Mail", name: "mail" },
    { label: "Avatar", name: "avatar" }
  ],
  async exist({ login }) {
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
    RETURNING *
    `;
    let data = await pool.query(query, [login, hashedPass, mail]);
    let user = data.rows[0];
    delete user.password;
    return user;
  },
  async login({ login, password }) {
    const query = `
    SELECT login, password, id, avatar, mail FROM users
    WHERE login=$1 
  `;
    const resault = await pool.query(query, [login]);
    if (resault.rowCount === 0) {
      return {
        succes: false,
        user: null
      };
    } else {
      let user = resault.rows[0];
      let hash = user.password;
      delete user.password;
      return {
        succes: await bcrypt.compare(password, hash),
        user
      };
    }
  },
  async edit(userID, { login, mail, avatar }) {
    const query = `
      UPDATE users
      SET login=$1, mail=$2, avatar=$3
      WHERE id=$4
      RETURNING *
    `;
    let resault = await pool.query(query, [login, mail, avatar, userID]);
    let user = resault.rows[0];
    delete user.password;
    return user;
  },
  async editPassword(userID, newPassword) {
    let hash = await bcrypt.hash(newPassword, 10);
    const query = `
    UPDATE users
    SET password=$1
    WHERE id=$2
    `;
    let response = await pool.query(query, [hash, userID]);
    console.log("EDIT PASSWORD");
    console.log(response);
  }
};
