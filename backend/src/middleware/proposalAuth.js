const jwt = require("jsonwebtoken");
const proposalAuthenticated = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({ message: "Unauthorized token is required" });
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Unauthorized token is wrong or expired" });
  }
};

module.exports = proposalAuthenticated;
