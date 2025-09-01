const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

const catchErrAsync = require("../utils/catchErrAsync");

// /admin/add-product => GET
router.get("/add-product", catchErrAsync(adminController.getAddProduct));

// /admin/products => GET
router.get("/products", catchErrAsync(adminController.getProductsPage));

// /admin/add-product => POST
router.post("/add-product", catchErrAsync(adminController.postAddProduct));

router.get("/edit-product/:productId", catchErrAsync(adminController.getEditProduct));

router.post("/edit-product", catchErrAsync(adminController.postEditProduct));

router.post("/delete/:productId", catchErrAsync(adminController.postDeleteProduct))

module.exports = router;
