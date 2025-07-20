const validator = require("validator");

function signupValidation(req) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) {
    throw new Error("Name is required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }

  if (!confirmPassword) {
    throw new Error("Confirm password is required");
  }

  if (password !== confirmPassword) {
    throw new Error("Password and confirm password should be same");
  }
}

function loginValidation(req) {
  const { email, password } = req.body;

  if (!email) {
    throw new Error("Email is required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!password) {
    throw new Error("Password is required");
  }
}

function profileValidation(req) {
  const { name } = req.body;

  if (!name) {
    throw new Error("Name is required");
  }
}

function passwordValidation(req) {
  const { password, confirmPassword } = req.body;

  if (!password) {
    throw new Error("Password is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }

  if (!confirmPassword) {
    throw new Error("Confirm password is required");
  }

  if (password !== confirmPassword) {
    throw new Error("Password and confirm password should be same");
  }
}

function expenseValidation(req) {
  const { title } = req.body;

  if (!title) {
    throw new Error("Title is required");
  }
}

module.exports = {
  expenseValidation,
  loginValidation,
  passwordValidation,
  profileValidation,
  signupValidation,
};
