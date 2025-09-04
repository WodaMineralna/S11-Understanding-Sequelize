const { fetchAll, findProductById, addProduct } = require("../models/product");
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
  const cartItems = await fetchAll(req.user, "cart");
  console.log('🔥TEST 🔥 TEST🔥', cartItems)

  res.render("shop/cart", {
    products: cartItems,
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = async (req, res, next) => {
  const id = req.body.productId;

  await addProduct(req.user, id, "cart");

  res.redirect("/cart");
};

// ! TO BE IMPLEMENTED
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
