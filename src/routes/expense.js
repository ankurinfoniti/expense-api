const express = require("express");

const { userAuth } = require("../middleware/auth");
const { expenseAuth } = require("../middleware/expenseAuth");
const Expense = require("../models/expense");
const { expenseValidation } = require("../utils/validator");

const expenseRouter = express.Router();

expenseRouter.get("/expenses", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const expenses = await Expense.findAll({ where: { user_id: user.id } });

    res.send(expenses);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

expenseRouter.get("/expenses/:id", userAuth, expenseAuth, async (req, res) => {
  try {
    res.send(req.expense);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

expenseRouter.post("/expenses", userAuth, async (req, res) => {
  try {
    // validate request
    expenseValidation(req);

    // save data
    const user = req.user;
    const { categoryId, title, amount, date, description } = req.body;

    const expense = await Expense.create({
      category_id: categoryId,
      title,
      amount,
      date,
      description,
      user_id: user.id,
    });

    // send response
    res.send({ message: "Expense added successfully!", data: expense });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

expenseRouter.patch(
  "/expenses/:id",
  userAuth,
  expenseAuth,
  async (req, res) => {
    try {
      // validate request
      expenseValidation(req);

      // update data
      const { categoryId, title, amount, date, description } = req.body;
      const expense = req.expense;

      expense.category_id = categoryId;
      expense.title = title;
      expense.amount = amount;
      expense.date = date;
      expense.description = description;

      await expense.save();

      // send response
      res.send({ message: "Expense updated successfully!", data: expense });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

expenseRouter.delete(
  "/expenses/:id",
  userAuth,
  expenseAuth,
  async (req, res) => {
    try {
      await req.expense.destroy();

      // send response
      res.send({ message: "Expense deleted successfully!" });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

module.exports = expenseRouter;
