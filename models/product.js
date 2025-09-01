const { DataTypes } = require("sequelize");

const sequelize = require("../src/db/pool");

// ! sequelize.sync() in app.js will automatically pluralise the table name ('product' --> 'products')
const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// ! currently won't be using the helper function [utils/db-helpers loadData()]
// TODO use the helper function in the future
async function fetchAll() {
  try {
    const products = await Product.findAll({ raw: true });
    return products;
  } catch (error) {
    throw new Error(`An error occurred while fetching db data! --- ${error}`);
  }
}

async function findProductById(id) {
  try {
    const product = await Product.findByPk(id);
    // console.log(`Found product with ID: ${id} ---`, product); // DEBUGGING
    return product;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching ID: (${id}) item data data! --- ${error}`
    );
  }
}

async function updateProduct(productUpdateData) {
  try {
    const productId = productUpdateData.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error(`No product found with ID: ${productId}`);
    }

    await product.update(productUpdateData);
    // const result = await product.update(productUpdateData); // DEBUGGING
    // console.log(`Updated product with ID: ${productId} ---`, result); // DEBUGGING
  } catch (error) {
    throw new Error(
      `An error occurred while updating product data! --- ${error}`
    );
  }
}

// ? probably gonna outsorce the function to a helper function (utils/db-helpers.js)    --    so it's reusable in addToCart functions
async function addProduct(productData) {
  try {
    const addedProduct = await Product.create({ ...productData });
    console.log(`Added product data: ${addedProduct}`); // DEBUGGING
    return addedProduct.id;
  } catch (error) {
    throw new Error(
      `An error occured while adding a new product! --- ${error}`
    );
  }
}

async function deleteProduct(id) {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error(`No product found with ID: ${productId}`);
    }

    await product.destroy();
    // const result = await product.update(productUpdateData); // DEBUGGING
    // console.log(`Updated product with ID: ${productId} ---`, result); // DEBUGGING
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
