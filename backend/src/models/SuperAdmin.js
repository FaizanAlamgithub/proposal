const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuperAdminSchema = new Schema({
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
});

const SuperAdminModel = mongoose.model("SuperAdmin", SuperAdminSchema);

module.exports = SuperAdminModel;
