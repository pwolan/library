require("dotenv").config();
const session = require("express-session");
const PostgreSqlStore = require("connect-pg-simple")(session);
const { Pool } = require("pg");

let isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

const sessionStore = new PostgreSqlStore({
  pool: pool,
  tableName: "session"
});

module.exports = { pool, sessionStore };
