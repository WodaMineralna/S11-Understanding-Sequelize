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

async function fetchAll(user, table) {
  try {
    let products;

    if (user && table === "cart") {
      const cart = await user.getCart();
      products = await cart.getProducts();
      // console.log("Fetched cart items:", products); // DEBUGGING
      return products;
    }
    if (user && table === "orders") {
      const orders = await user.getOrders({ include: ["products"] });
      return orders;
    }

    if (user) {
      products = await user.getProducts({ raw: true });
    } else {
      products = await Product.findAll({ raw: true });
    }
    return products;
  } catch (error) {
    throw new Error(`An error occurred while fetching db data! --- ${error}`);
  }
}

async function findProductById(id, user) {
  try {
    let product;

    if (user) {
      product = await user.getProducts({ where: { id } }); // ^ yields an empty array, when no product was found
    } else {
      product = await Product.findByPk(id);
    }
    if (!product || product.length === 0) {
      // ^ so product.length === 0 must be also checked here
      throw new Error(`No product found with ID: ${id}`);
    }
    // console.log(`Found product with ID: ${id} ---`, product); // DEBUGGING
    return product;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching ID: (${id}) item data! --- ${error}`
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

// ! function used both in creating a product, and adding a product to cart
async function addProduct(user, productData, isCart) {
  try {
    if (isCart === "cart") {
      const cart = await user.getCart();
      const products = await cart.getProducts({
        where: { id: productData },
      });

      let product;
      let quantity;

      // if product already exists in the cart, increase quantity
      if (products.length > 0) {
        product = products[0];
        quantity = product.cartItem.quantity || 0;
        await product.cartItem.update({ quantity: quantity + 1 });
        return;
      }

      product = await Product.findByPk(productData);
      if (!product) throw new Error("Product not found");

      await cart.addProduct(product, { through: { quantity: 1 } });
      return;
    }

    const addedProduct = await user.createProduct({ ...productData });
    console.log(`Added product data: ${addedProduct}`); // DEBUGGING
    return addedProduct.id;
  } catch (error) {
    throw new Error(
      `An error occured while adding a new product! --- ${error}`
    );
  }
}

async function deleteProduct(id, user, isCart) {
  try {
    if (isCart === "cart") {
      const cart = await user.getCart();
      await cart.removeProduct(id);
      return;
    }

    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error(`No product found with ID: ${id}`);
    }

    await product.destroy();
    // console.log(`Updated product with ID: ${id} ---`, result); // DEBUGGING
  } catch (error) {
    throw new Error(
      `An error occurred while deleting (ID: ${id}) product! --- ${error}`
    );
  }
}

async function addOrder(user) {
  try {
    const cart = await fetchAll(user, "cart");
    const order = await user.createOrder();
    if (!cart || !order) {
      throw new Error("Could not fetch cart or create a new order");
    }

    // console.log("Created order:", order); // DEBUGGING
    await order.addProducts(
      cart.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );
    const cartInstance = await user.getCart();
    return await cartInstance.setProducts(null);
  } catch (error) {
    throw new Error(`An error occurred while adding a new order! --- ${error}`);
  }
}

module.exports = {
  Product,
  fetchAll,
  findProductById,
  updateProduct,
  addProduct,
  deleteProduct,
  addOrder,
};
