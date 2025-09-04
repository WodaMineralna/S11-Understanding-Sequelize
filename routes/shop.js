const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

const catchErrAsync = require("../utils/catchErrAsync")

router.get("/", catchErrAsync(shopController.getIndex));

router.get("/products", catchErrAsync(shopController.getProductsPage));

router.get("/products/:id", catchErrAsync(shopController.getProduct));

router.get("/cart", catchErrAsync(shopController.getCart));

router.post("/cart", catchErrAsync(shopController.postCart));

// ! to be implemented soon
// router.post("/cart/delete/:productId", catchErrAsync(shopController.postDeleteCart))

router.get("/orders", catchErrAsync(shopController.getOrders));

router.get("/checkout", catchErrAsync(shopController.getCheckout));

module.exports = router;
