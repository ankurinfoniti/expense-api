const express = require("express");

const { userAuth } = require("../middleware/auth");
const { profileValidation, passwordValidation } = require("../utils/validator");
const { hashPassword } = require("../utils/bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile", userAuth, async (req, res) => {
  try {
    profileValidation(req);

    // update user data
    const loggedInUser = req.user;
    const { name } = req.body;

    loggedInUser.name = name;

    await loggedInUser.save();

    res.send({ message: "User updated successfully!", data: loggedInUser });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    passwordValidation(req);

    // update password
    const loggedInUser = req.user;

    loggedInUser.password = await hashPassword(req.body.password);

    await loggedInUser.save();

    res.send({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
