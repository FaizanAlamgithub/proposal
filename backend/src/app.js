const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const proposalRoutes = require("./routes/proposalRoutes");
const adminRoute = require("./routes/adminRoute");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", proposalRoutes);
app.use("/auth", adminRoute);

module.exports = app;
