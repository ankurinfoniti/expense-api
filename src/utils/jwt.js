require("dotenv").config();
const jwt = require("jsonwebtoken");

function getJwt(data) {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}

function verifyJwt(token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = { getJwt, verifyJwt };
