// require("dotenv").config();
// const AdminModel = require("../models/Admin");
// const bcrypt = require("bcryptjs");

// // const getAdminData = async (req, res) => {
// //   try {
// //     const admins = await AdminModel.find();
// //     if (!admins || admins.length === 0) {
// //       return res.status(404).json({
// //         message: "No admin accounts found",
// //         success: false,
// //       });
// //     }

// //     const adminData = admins.map((admin) => ({
// //       id: admin._id,
// //       name: admin.name,
// //       email: admin.email,
// //     }));

// //     res.status(200).json({
// //       message: "Admin data retrieved successfully",
// //       success: true,
// //       adminData,
// //     });
// //   } catch (error) {
// //     console.error("Get Admin Data Error:", error);
// //     res.status(500).json({ message: "Internal Server Error", success: false });
// //   }
// // };

// const getAdminData = async (req, res) => {
//   try {
//     const admins = await AdminModel.find();
//     const adminData = admins.map((admin) => ({
//       id: admin._id,
//       name: admin.name,
//       email: admin.email,
//       createdAt: admin.createdAt, // Use createdAt (from timestamps) or createdDate
//     }));

//     res.status(200).json({
//       message:
//         admins.length > 0
//           ? "Admin data retrieved successfully"
//           : "No admin accounts found",
//       success: true,
//       adminData: adminData.length > 0 ? adminData : [],
//     });
//   } catch (error) {
//     console.error("Get Admin Data Error:", error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };

// const deleteAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const admin = await AdminModel.findByIdAndDelete(id);
//     if (!admin) {
//       return res.status(404).json({
//         message: "Admin not found",
//         success: false,
//       });
//     }

//     res.status(200).json({
//       message: "Admin deleted successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Delete Admin Error:", error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };

// const resetPassword = async (req, res) => {
//   try {
//     const { id } = req.params; // Superadmin ID from URL
//     const { newPassword } = req.body; // New password from request body

//     if (!newPassword) {
//       return res.status(400).json({
//         message: "New password is required",
//         success: false,
//       });
//     }

//     const admin = await AdminModel.findById(id);
//     if (!admin) {
//       return res.status(404).json({
//         message: "Super Admin not found",
//         success: false,
//       });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the password
//     admin.password = hashedPassword;
//     await admin.save();

//     res.status(200).json({
//       message: "Password reset successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };

// module.exports = {
//   getAdminData,
//   deleteAdmin,
//   resetPassword,
// };

require("dotenv").config();
const AdminModel = require("../models/Admin.js");
const bcrypt = require("bcryptjs");

const getAdminData = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    const adminData = admins.map((admin) => ({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      createdAt: admin.createdAt,
    }));

    res.status(200).json({
      message:
        admins.length > 0
          ? "Admin data retrieved successfully"
          : "No admin accounts found",
      success: true,
      adminData: adminData.length > 0 ? adminData : [],
    });
  } catch (error) {
    console.error("Get Admin Data Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await AdminModel.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Admin deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Delete Admin Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const resetAdminCredentials = async (req, res) => {
  try {
    const { id } = req.params;
    const { newEmail, newPassword } = req.body;

    // Check if at least one field is provided
    if (!newEmail && !newPassword) {
      return res.status(400).json({
        message: "At least one of new email or new password is required",
        success: false,
      });
    }

    const admin = await AdminModel.findById(id);
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
        success: false,
      });
    }

    // Update email if provided
    if (newEmail) {
      // Optional: Check if the new email is already in use by another admin
      const emailExists = await AdminModel.findOne({ email: newEmail });
      if (emailExists && emailExists._id.toString() !== id) {
        return res.status(409).json({
          message: "This email is already in use by another admin",
          success: false,
        });
      }
      admin.email = newEmail;
    }

    // Update password if provided
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
    }

    await admin.save();

    res.status(200).json({
      message: "Admin credentials reset successfully",
      success: true,
    });
  } catch (error) {
    console.error("Reset Admin Credentials Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  getAdminData,
  deleteAdmin,
  resetAdminCredentials,
};
