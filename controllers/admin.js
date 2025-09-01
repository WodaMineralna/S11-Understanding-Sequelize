const {
  fetchAll,
  findProductById,
  updateProduct,
  addProduct,
  deleteProduct,
} = require("../models/product");

exports.getProductsPage = async (req, res, next) => {
  const products = await fetchAll("products");
  res.render("admin/products", {
    products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  const product = await findProductById(prodId);
  if (product.id === "undefined") {
    return res.redirect("/"); // not the best UX, but it's a dummy project
  }

  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const { title, imageUrl, description, price } = req.body;
  const product = { prodId, title, imageUrl, description, price };

  console.log("controllers/admin.js | Edited productId: ", prodId);
  await updateProduct(product);
  res.redirect("/");
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = { title, imageUrl, description, price };
  const addedProductId = await addProduct(product);
  res.redirect(`/products/${addedProductId}`);
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  await deleteProduct(prodId);
  res.redirect("/admin/products");
};
