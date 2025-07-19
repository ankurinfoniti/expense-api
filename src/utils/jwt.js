require("dotenv").config();
const jwt = require("jsonwebtoken");

function getJwt(data) {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}

module.exports = { getJwt };
