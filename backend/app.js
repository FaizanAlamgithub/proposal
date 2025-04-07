require("dotenv").config();
// const express = require("express");
const connectToMongoDB = require("./src/config/db.js");
const app = require("./src/index.js");

connectToMongoDB(
  process.env.MONGODB ?? "mongodb://localhost:27017/short-url"
).then(() => {
  console.log("App is ready 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
