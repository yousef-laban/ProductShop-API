const express = require("express");
const passport = require("passport");

const router = express.Router();
// const upload = require("../middleware/multer");

const { checkout } = require("../controllers/orderContrtollers");

router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);

module.exports = router;
