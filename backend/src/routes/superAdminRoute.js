const {
  superAdminLogin,
  superAdminSignup,
  resetSuperAdminCredentials,
} = require("../controllers/superAdminController");

const router = require("express").Router();

router.post("/super-admin-login", superAdminLogin);
router.post("/super-admin-signup", superAdminSignup);
router.put("/superadmin/reset-credentials/:id", resetSuperAdminCredentials);

module.exports = router;
