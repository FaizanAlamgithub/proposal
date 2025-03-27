require("dotenv").config();
// Ensure environment variables are loaded

const AdminModel = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newAdmin = new AdminModel({ name, email, password: hashedPassword });
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Account created successful", success: true });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(403).json({
        message: "Authentication Failed: Email or Password is incorrect",
        success: false,
      });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Authentication Failed: Email or Password is incorrect",
        success: false,
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { email: admin.email, _id: admin._id },
      process.env.JWT_SECRET, // Potential Issue
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email,
      name: admin.name,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  signup,
  login,
};

// require("dotenv").config(); // Ensure environment variables are loaded

// const AdminModel = require("../models/Admin");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { transporter } = require("../config/nodeMailer.js");

// const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.json({ success: false, message: "Missing Details" });
//   }

//   try {
//     const existingAdmin = await AdminModel.findOne({ email });
//     if (existingAdmin) {
//       return res.json({ success: false, message: "Admin already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = new AdminModel({ name, email, password: hashedPassword });

//     await admin.save();

//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     // sending welcome email
//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: "Welcome to JCA",
//       text: `Welcome to JCA your account has been created with email id: ${email}`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ success: true });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.json({
//       success: false,
//       message: "Email and Password are required !",
//     });
//   }

//   try {
//     const admin = await AdminModel.findOne({ email });

//     if (!admin) {
//       return res.json({ success: false, message: "Invalid email" }); // ✅ Return added
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);

//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid password" }); // ✅ Return added
//     }

//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({ success: true }); // ✅ Ensuring only one response is sent
//   } catch (error) {
//     return res.json({ success: false, message: error.message }); // ✅ Return added
//   }
// };

// const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       // maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({ success: true, message: "logged Out" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// //  send verification otp

// const sendVerifyOtp = async (req, res) => {
//   try {
//     const { adminId } = req.body;

//     const admin = await AdminModel.findById(adminId);

//     if (admin.isAccountVerified) {
//       return res.json({ success: false, message: "Account Already verified" });
//     }

//     const otp = String(Math.floor(100000 + Math.random() * 900000));

//     admin.verifyOtp = otp;
//     admin.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

//     await admin.save();

//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: admin.email,
//       subject: "Account verification OTP",
//       text: `Your OTP is ${otp} please verify your account`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ success: true, message: "Verification OTP sent on email" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// //  Verify email

// const verifyEmail = async (req, res) => {
//   const { adminId, otp } = req.body;

//   if (!adminId || !otp) {
//     return res.json({ success: false, message: "missing details" });
//   }

//   try {
//     const admin = await AdminModel.findById(adminId);

//     if (!admin) {
//       return res.json({ success: false, message: "user not found" });
//     }

//     if (admin.verifyOtp === "" || admin.verifyOtp !== otp) {
//       return res.json({ success: false, message: "invalid otp" });
//     }

//     if (admin.verifyOtpExpireAt < Date.now()) {
//       return res.json({ success: false, message: "otp expired" });
//     }

//     admin.isAccountVerified = true;

//     admin.verifyOtp = "";

//     admin.verifyOtpExpireAt = 0;

//     await admin.save();

//     return res.json({ success: true, message: "Email verified successfully" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // Send password reset Otp

// const sendResetOtp = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.json({ success: false, message: "Email is required" });
//   }

//   try {
//     const admin = await AdminModel.findOne({ email });

//     if (!admin) {
//       return res.json({ success: false, message: "Admin not found" });
//     }

//     const otp = String(Math.floor(100000 + Math.random() * 900000));

//     admin.resetOtp = otp;
//     admin.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

//     await admin.save();

//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: "Password Reset OTP",
//       text: `Your OTP is ${otp}. Reset your password`,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.json({ success: true, message: "OTP send to your email" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // check if admin is authenticated

// const isAuthenticated = async (req, res) => {
//   try {
//     return res.json({ success: true });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Reset Admin Password

// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   if (!email || !otp || !newPassword) {
//     return res.json({
//       success: false,
//       message: "Email, OTP and new password required",
//     });
//   }

//   try {
//     const admin = await AdminModel.findOne({ email });
//     if (!admin) {
//       return res.json({ success: false, message: "Admin not found" });
//     }

//     if (admin.resetOtp === "" || admin.resetOtp !== otp) {
//       return res.json({ success: false, message: "Invalid OTP" });
//     }

//     if (admin.resetOtpExpireAt < Date.now()) {
//       return res.json({ success: false, message: "OTP Expired" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     admin.password = hashedPassword;
//     admin.resetOtp = "";
//     admin.resetOtpExpireAt = 0;

//     await admin.save();

//     return res.json({
//       success: true,
//       message: "Password has been reset successfully",
//     });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   signup,
//   login,
//   logout,
//   sendVerifyOtp,
//   verifyEmail,
//   isAuthenticated,
//   sendResetOtp,
//   resetPassword,
// };
