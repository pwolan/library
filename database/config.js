require("dotenv").config();

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
  // connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  connectionString: 'postgres://edvreywrxmcvxn:6185fe018111726037d1d5bcdb351f5ec5ccb0edc548d5d8c15b73c420727fef@ec2-18-235-97-230.compute-1.amazonaws.com:5432/d91g2r3cuifmha',
  ssl: isProduction
});


module.exports = { pool, connectionString };
