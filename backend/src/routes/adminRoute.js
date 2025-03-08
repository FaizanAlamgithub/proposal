const { signup, login } = require("../controllers/adminController");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/verifyAdmin");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
