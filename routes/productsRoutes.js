const express = require("express");
let products = require("../data");
const app = express();

const router = express.Router();

const {
  productsDetails,
  productsList,
  productsDelete,
  productsCreat,
  productsUpdate,
  fetchProduct,
} = require("../controllers/productsControllers");

const upload = require("../middleware/multer");

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

router.post("/", upload.single("url"), productsCreat);

router.put("/:productId", upload.single("url"), productsUpdate);

module.exports = router;
