const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  signup,
  signin,
  fetchUser,
  shopsCreat,
} = require("../controllers/userControllers");

const upload = require("../middleware/multer");

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);
  if (user) {
    req.user = user;
    next();
  } else next({ message: "User Not found", status: 404 });
});

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.post("/:userId/shops", upload.single("url"), shopsCreat);

module.exports = router;
