const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler((req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("not authorized :>");
  }

  const token = authHeader.split(" ")[1];
  console.log("token :", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
      throw new Error(" unauthorized : user is not authorized");
    }
    req.user = decoded.user;
    next();
  });
  if (!token) {
    res.sendStatus(401);
    throw new Error("unauthorized : token is missing");
  }
});

module.exports = validateToken;
