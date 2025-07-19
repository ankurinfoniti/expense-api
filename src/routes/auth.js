const express = require("express");

const { loginValidation, signupValidation } = require("../utils/validator");
const User = require("../models/user");
const { getJwt } = require("../utils/jwt");
const { comparePassword, hashPassword } = require("../utils/bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of email, password and confirm password
    signupValidation(req);

    // save records
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = await User.create({ name, email, password: hashedPassword });

    // create token and send it by cookies
    const token = getJwt({ id: user.id });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // send responds
    res.send({ message: "User added successfully!", data: user });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send("ERROR: " + "Email already exists");
    }

    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    // validation of email and password
    loginValidation(req);

    // verify user
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // create token and send it by cookies
    const token = getJwt({ id: user.id });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.send({ message: "User logged in successfully!", data: user });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send({ message: "User logged out successfully!" });
});

module.exports = authRouter;
