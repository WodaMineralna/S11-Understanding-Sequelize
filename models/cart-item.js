const { DataTypes } = require("sequelize");
const sequelize = require("../src/db/pool");

const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { CartItem };
