const SuperAdminModel = require("../models/SuperAdmin");
const jwt = require("jsonwebtoken");

const verifySuperAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const superAdmin = await SuperAdminModel.findOne({ email });
    if (!superAdmin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You are not the registered Super Admin.",
      });
    }

    next(); // Proceed to login/signup
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = verifySuperAdmin;
