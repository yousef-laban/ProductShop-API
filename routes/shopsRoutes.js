const express = require("express");
const app = express();

const router = express.Router();

const {
  shopsDetails,
  shopsList,
  shopsDelete,
  shopsCreat,
  shopsUpdate,
  fetchShop,
  productsCreat,
} = require("../controllers/shopsControllers");

const upload = require("../middleware/multer");

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else next({ message: "Shop Not found", status: 404 });
});

router.get("/", shopsList);

router.get("/:shopId", shopsDetails);

router.delete("/:shopId", shopsDelete);

// router.post("/", upload.single("url"), shopsCreat);

router.put("/:shopId", upload.single("url"), shopsUpdate);

router.post("/:shopId/products", upload.single("url"), productsCreat);

module.exports = router;
