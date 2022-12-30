const jwt = require("jsonwebtoken");

// Middleware function to authenticate incoming requests
const auth = (req, res, next) => {
  // Check for the "Authorization" header
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  // Extract the JWT from the "Authorization" header
  const token = req.headers.authorization.split(" ")[1];

  // Verify the JWT using the JWT_SECRET
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = auth;
