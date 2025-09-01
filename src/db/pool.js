require("dotenv").config();
const { Sequelize } = require("sequelize");

function required(name) {
  const v = process.env[name];

  if (!v) throw new Error(`Missing .env var: ${name}`);
  return v;
}

const sequelize = new Sequelize(
  required("DB_NAME"),
  required("DB_USER"),
  required("DB_PASSWORD"),
  {
    dialect: "mysql",
    host: required("DB_HOST"),
    port: Number(required("DB_PORT")),
  }
);

module.exports = sequelize;
