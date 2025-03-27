const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const proposalRoutes = require("./routes/proposalRoutes.js");
const adminRoute = require("./routes/adminRoute.js");
const superAdminRoute = require("./routes/superAdminRoute.js");

const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminDetailRoute.js");

const app = express();

const allowedOrigins = [
  "https://proposal-admin.onrender.com",
  "https://proposal-client.onrender.com",
]; // if your frontend running another url you can also add here by seperate coma

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/api", proposalRoutes);
app.use("/auth", adminRoute);
app.use("/auth", superAdminRoute);
app.use("/admin", adminRouter);
module.exports = app;
