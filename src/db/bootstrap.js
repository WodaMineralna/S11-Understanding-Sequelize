const sequelize = require("./pool");

require("../../models/user");
require("../../models/product");
require("../../models/cart");
require("../../models/cart-item");
require("../../models/order");
require("../../models/order-item");
const { applyAssociations } = require("../../models/associations");

// * .sync() creates tables for all Sequelize Models and defines their relations
// ! dev only - 'migrations' should be used in prod
async function ensureSchema() {
  try {
    console.log("Tables:", Object.keys(sequelize.models)); // DEBUGGING
    applyAssociations(sequelize);

    await sequelize.sync();
    // await sequelize.sync({ alter: true });
    // await sequelize.sync({ force: true });
  } catch (error) {
    throw new Error(error);
  }
}

async function ensureUserAndCart(userId = 1) {
  const { User } = sequelize.models;
  try {
    let user = await User.findByPk(userId);
    if (!user) {
      user = await User.create({
        id: userId,
        name: "Igor",
        email: `${Date.now()}@test.com`,
      });
    }

    let cart = await user.getCart();
    if (!cart) cart = await user.createCart();
    return { user, cart };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { ensureSchema, ensureUserAndCart };
