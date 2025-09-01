require("dotenv").config();
const mysql = require("mysql2/promise");

function required(name) {
  const v = process.env[name];

  if (!v) throw new Error(`Missing .env var: ${name}`);
  return v;
}

const pool = mysql.createPool({
  host: required("DB_HOST"),
  port: Number(required("DB_PORT")),
  user: required("DB_USER"),
  database: required("DB_NAME"),
  password: required("DB_PASSWORD"),
});

module.exports = pool