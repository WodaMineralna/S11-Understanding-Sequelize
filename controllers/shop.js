const { fetchAll, findProductById } = require("../models/product");
const Cart = require("../models/cart");

exports.getProductsPage = async (req, res, next) => {
  const products = await fetchAll();
  res.render("shop/product-list", {
    products,
    pageTitle: "All Products",
    path: "/products",
  });
};

exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  const filteredProduct = await findProductById(id);

  res.render("shop/product-detail", {
    product: filteredProduct,
    pageTitle: `${filteredProduct.title} Details`,
    path: "/products",
  });
};

exports.getIndex = async (req, res, next) => {
  const products = await fetchAll();
  res.render("shop/index", {
    products,
    pageTitle: "Shop",
    path: "/",
  });
};

exports.getCart = async (req, res, next) => {
  const cart = await Cart.fetchAll(); // contains only item ID and item quantity
  const products = [];

  for (const item of cart) {
    const filteredItem = await Product.findProductById(item.id); // ^ fetch the full cart item data
    // console.log(filteredItem); // DEBUGGING
    products.push({
      ...filteredItem,
      quantity: item.quantity,
      totalPrice: Number((filteredItem.price * item.quantity).toFixed(2)),
    });
  }

  console.log(products); // DEBUGGING

  res.render("shop/cart", {
    products,
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = async (req, res, next) => {
  const id = req.body.productId;
  console.log(`console.log() in 'controllers/shop.js: ${id} - added productId`); // DEBUGGING

  await Cart.addProduct(id);

  res.redirect("/cart");
};

exports.postDeleteCart = async (req, res, next) => {
  const id = req.body.productId;

  await Cart.deleteCartItem(id);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
