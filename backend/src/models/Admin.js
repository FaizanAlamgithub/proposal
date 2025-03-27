const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;

// const { required, boolean } = require("joi");

// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   verifyOtp: { type: String, default: "" },
//   verifyOtpExpireAt: { type: Number, default: 0 },
//   isAccountVerified: { type: Boolean, default: false },
//   resetOtp: { type: String, default: "" },
//   resetOtpExpireAt: { type: Number, default: 0 },
// });

// const AdminModel =
//   mongoose.models.Admin || mongoose.model("Admin", adminSchema);

// module.exports = AdminModel;
