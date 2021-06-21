const express = require("express");
let products = require("../data");

const router = express.Router();

const {
  productsDetails,
  productsList,
  productsDelete,
  productsCreat,
  productsUpdate,
  fetchProduct,
} = require("../controllers/productsControllers");

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else next({ message: "Product Not found", status: 404 });
});

router.get("/", productsList);

router.get("/:productId", productsDetails);

router.delete("/:productId", productsDelete);

router.post("/", productsCreat);

router.post("/:productId", productsUpdate);

module.exports = router;
