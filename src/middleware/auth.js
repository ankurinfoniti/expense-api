const User = require("../models/user");
const { verifyJwt } = require("../utils/jwt");

const userAuth = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Please login");
    }

    const decodedToken = verifyJwt(token);
    const { id } = decodedToken;

    const user = await User.findByPk(id);

    if (user === null) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

module.exports = { userAuth };
