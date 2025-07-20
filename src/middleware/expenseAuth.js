const Expense = require("../models/expense");

const expenseAuth = async (req, res, next) => {
  try {
    const user = req.user;
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send("Expense not found!");
    }

    if (user.id !== expense.user_id) {
      return res.status(401).send("Unauthorized access!");
    }

    req.expense = expense;
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = { expenseAuth };
