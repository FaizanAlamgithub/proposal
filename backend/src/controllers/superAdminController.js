require("dotenv").config();
// Ensure environment variables are loaded

const SuperAdminModel = require("../models/SuperAdmin.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const superAdminSignup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if the user already exists
//     const existingSuperAdmin = await SuperAdminModel.findOne({ email });
//     if (existingSuperAdmin) {
//       return res.status(409).json({
//         message: "User already exists, you can login",
//         success: false,
//       });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new admin user
//     const newSuperAdmin = new SuperAdminModel({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     await newSuperAdmin.save();

//     res.status(201).json({ message: "Signup successful", success: true });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };

// const superAdminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const superAdmin = await SuperAdminModel.findOne({ email });
//     if (!superAdmin) {
//       return res.status(403).json({
//         message: "Authentication Failed: Email or Password is incorrect",
//         success: false,
//       });
//     }

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
//     if (!isPasswordValid) {
//       return res.status(403).json({
//         message: "Authentication Failed: Email or Password is incorrect",
//         success: false,
//       });
//     }

//     // Generate JWT token
//     const jwtToken = jwt.sign(
//       { email: superAdmin.email, _id: superAdmin._id },
//       process.env.JWT_SECRET_SUPER, // Potential Issue
//       { expiresIn: "24h" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       success: true,
//       jwtToken,
//       email,
//       name: superAdmin.name,
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };

// const superAdminSignup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if there is already a super admin in the database
//     const existingSuperAdmin = await SuperAdminModel.findOne({});
//     if (existingSuperAdmin) {
//       return res.status(403).json({
//         message: "Super Admin already exists. Only one Super Admin is allowed.",
//         success: false,
//       });
//     }

//     // Hash the password before storing
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the Super Admin
//     const newSuperAdmin = new SuperAdminModel({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     await newSuperAdmin.save();

//     res.status(201).json({
//       message: "Super Admin account created successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };
const superAdminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a super admin with the same email already exists
    const existingSuperAdmin = await SuperAdminModel.findOne({ email });
    if (existingSuperAdmin) {
      return res.status(409).json({
        message: "A Super Admin with this email already exists.",
        success: false,
      });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the Super Admin
    const newSuperAdmin = new SuperAdminModel({
      name,
      email,
      password: hashedPassword,
    });
    await newSuperAdmin.save();

    res.status(201).json({
      message: "Super Admin account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// const superAdminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the first (and only) Super Admin
//     const superAdmin = await SuperAdminModel.findOne({});
//     if (!superAdmin) {
//       return res.status(403).json({
//         message: "No Super Admin found. Please contact support.",
//         success: false,
//       });
//     }

//     // Ensure the email matches the stored super admin account
//     if (superAdmin.email !== email) {
//       return res.status(403).json({
//         message: "Unauthorized: You are not the registered Super Admin.",
//         success: false,
//       });
//     }

//     // Verify the password
//     const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
//     if (!isPasswordValid) {
//       return res.status(403).json({
//         message: "Authentication Failed: Email or Password is incorrect",
//         success: false,
//       });
//     }

//     // Generate JWT token
//     const jwtToken = jwt.sign(
//       { email: superAdmin.email, _id: superAdmin._id, role: "super-admin" },
//       process.env.JWT_SECRET_SUPER,
//       { expiresIn: "24h" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       success: true,
//       jwtToken,
//       email,
//       name: superAdmin.name,
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };

const superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the Super Admin exists
    const superAdmin = await SuperAdminModel.findOne({ email });
    if (!superAdmin) {
      return res.status(200).json({
        success: false,
        message: "Unauthorized: You are not the registered Super Admin.",
      });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
    if (!isPasswordValid) {
      return res.status(200).json({
        success: false,
        message: "Authentication Failed: Email or Password is incorrect",
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { email: superAdmin.email, _id: superAdmin._id },
      process.env.JWT_SECRET_SUPER,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      jwtToken,
      email,
      name: superAdmin.name,
      superAdminId: superAdmin._id, // Include superAdminId
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(200).json({
      success: false,
      message: "Something went wrong, please try again later.",
    });
  }
};

// const resetSuperAdminCredentials = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { newEmail, newPassword } = req.body;

//     if (!newEmail && !newPassword) {
//       return res.status(400).json({
//         message: "At least one of new email or new password is required",
//         success: false,
//       });
//     }

//     const superAdmin = await SuperAdminModel.findById(id);
//     if (!superAdmin) {
//       return res.status(404).json({
//         message: "Super Admin not found",
//         success: false,
//       });
//     }

//     if (newEmail) {
//       const emailExists = await SuperAdminModel.findOne({ email: newEmail });
//       if (emailExists && emailExists._id.toString() !== id) {
//         return res.status(409).json({
//           message: "This email is already in use by another super admin",
//           success: false,
//         });
//       }
//       superAdmin.email = newEmail;
//     }

//     if (newPassword) {
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       superAdmin.password = hashedPassword;
//     }

//     await superAdmin.save();

//     res.status(200).json({
//       message: "Super Admin credentials reset successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Reset Super Admin Credentials Error:", error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };

const resetSuperAdminCredentials = async (req, res) => {
  try {
    const { id } = req.params;
    const { newEmail, newPassword } = req.body;

    if (!newEmail && !newPassword) {
      return res.status(400).json({
        message: "At least one of new email or new password is required",
        success: false,
      });
    }

    const superAdmin = await SuperAdminModel.findById(id);
    if (!superAdmin) {
      return res.status(404).json({
        message: "Super Admin not found",
        success: false,
      });
    }

    if (newEmail) {
      const emailExists = await SuperAdminModel.findOne({ email: newEmail });
      if (emailExists && emailExists._id.toString() !== id) {
        return res.status(409).json({
          message: "This email is already in use by another super admin",
          success: false,
        });
      }
      superAdmin.email = newEmail;
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      superAdmin.password = hashedPassword;
    }

    await superAdmin.save();

    res.status(200).json({
      message: "Super Admin credentials reset successfully",
      success: true,
    });
  } catch (error) {
    console.error("Reset Super Admin Credentials Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  superAdminSignup,
  superAdminLogin,
  resetSuperAdminCredentials,
};
