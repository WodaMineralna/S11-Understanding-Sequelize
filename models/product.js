const db = require("../src/db/pool");

const { loadData } = require("../utils/db-helpers");

async function fetchAll() {
  const products = await loadData("products");
  return products;
}

async function findProductById(id) {
  try {
    const [rows] = await db.query(
      "SELECT id, title, price, description, imageUrl FROM products WHERE id = ? LIMIT 1",
      [id]
    );
    const item = rows[0];
    // console.log(item); // DEBUGGING
    return item;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching ID: (${id}) item data data! --- ${error}`
    );
  }
}

async function updateProduct(productData) {
  const { prodId, title, price, description, imageUrl } = productData;
  // console.log(prodId, title, price, description, imageUrl); // DEBUGGING

  try {
    const [result] = await db.query(
      "UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?",
      [title, price, description, imageUrl, prodId]
    );

    console.log("ITEM UPDATED (id):", result.affectedRows); // DEBUGGING
  } catch (error) {
    throw new Error(
      `An error occurred while updating product data! --- ${error}`
    );
  }
}

// ? probably gonna outsorce the function to a helper function (utils/db-helpers.js)    --    so it's reusable in addToCart functions
async function addProduct(productData) {
  const { title, price, description, imageUrl } = productData;
  console.log(productData);

  try {
    const [result] = await db.query(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [title, price, description, imageUrl]
    );

    console.log("New product created! It's ID:", result.insertId); // DEBUGGING
    return result.insertId;
  } catch (error) {
    throw new Error(
      `An error occurred while adding a new product! --- ${error}`
    );
  }
}

async function deleteProduct(id) {
  try {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    console.log(result.affectedRows); // DEBUGGING
  } catch (error) {
    throw new Error(
      `An error occurred while deleting (ID: ${id}) product! --- ${error}`
    );
  }
}

module.exports = {
  fetchAll,
  findProductById,
  updateProduct,
  addProduct,
  deleteProduct,
};
