// ! FILE CURRENTLY NOT FUNCTIONAL
// its routes were commented out (in routes/shop.js)

const {
  loadData,
  deleteItem,
  saveData,
  findExistingProductIndex,
} = require("../utils/db-helpers");

module.exports = class Cart {
  static async addProduct(id) {
    const cart = await loadData(p); // get the current cart data
    const existingProductIndex = findExistingProductIndex(cart, id); // check if the cartItem already exists

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity++; // increase quantity if the cartItem already exists
    } else {
      cart.push({ id, quantity: 1 }); // add a new cartItem if it doesn't already exist
    }

    // ^ write all of the cart data into the file
    await saveData(p, cart);
  }

  static async deleteCartItem(id) {
    await deleteItem(p, id);
  }

  static async fetchAll() {
    const cart = await loadData(p);
    return cart;
  }
};
