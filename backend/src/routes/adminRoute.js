const {
  signup,
  login,
  // logout,
  // sendResetOtp,
  // resetPassword,
  // sendVerifyOtp,
  // verifyEmail,
  // isAuthenticated,
} = require("../controllers/adminController.js");
// const { adminAuth } = require("../middleware/verifyAdmin.js");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/verifyAdmin");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
// router.post("/logout", logout);
// router.post("/send-otp-verification", adminAuth, sendVerifyOtp);
// router.post("/verify-account", adminAuth, verifyEmail);
// router.post("/auth-admin", adminAuth, isAuthenticated);
// router.post("/send-reset-otp", sendResetOtp);
// router.post("/reset-password", resetPassword);

module.exports = router;
