const jwt = require("jsonwebtoken");
const {UnauthenticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Invalid Authentication");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const { userId, name } = decoded;
    req.user = { userId, name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Invalid Authentication")
  }
};

module.exports = authMiddleware;
