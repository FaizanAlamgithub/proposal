// const express = require("express");
// const { getAdminData } = require("../controllers/adminDetailController.js");

// const adminRouter = express.Router();

// adminRouter.get("/data", getAdminData);

// module.exports = adminRouter;

const express = require("express");
const {
  getAdminData,
  deleteAdmin,
  resetAdminCredentials,
} = require("../controllers/adminDetailController.js");

const adminRouter = express.Router();

adminRouter.get("/data", getAdminData);
adminRouter.delete("/delete/:id", deleteAdmin);
adminRouter.put("/reset-password/:id", resetAdminCredentials);

module.exports = adminRouter;
