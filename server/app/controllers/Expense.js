const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Expense = require("../models/Expense");

dotenv.config();

module.exports = {
  // Add a new object
  addExpense: async (req, res) => {
    // Validate the request body
    const {
      amount,
      date,
      category_id,
      bank_account_id,
      merchant_id,
      payment_method_id,
      user_id,
      description,
    } = req.body;

    if (
      !amount ||
      !date ||
      !category_id ||
      !bank_account_id ||
      !merchant_id ||
      !payment_method_id ||
      !user_id
    ) {
      return res.status(400).json({ msg: "Missing field(s), check again" });
    }

    try {
      // Check if the user is authorized to create a new object
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user from the decoded token as the user for the new object
        const user = decoded.user;

        // Create the new object
        const newExpense = new Expense({
          amount,
          date,
          category_id,
          bank_account_id,
          merchant_id,
          payment_method_id,
          user_id,
          description,
          user: user.id,
        });

        // Save the new object to the database
        const savedExpense = await newExpense.save();

        res.json(savedExpense);
      } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  //   Get all objects
  getExpenses: async (req, res) => {
    try {
      // Check if the user is authorized to get object
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Get all objects
        const expenses = await Expense.find();
        res.json(expenses);
      } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Update a object
  updateExpense: async (req, res) => {
    // Validate the request body
    const {
      amount,
      date,
      category_id,
      bank_account_id,
      merchant_id,
      payment_method_id,
      user_id,
      description,
    } = req.body;

    if (
      !amount ||
      !date ||
      !category_id ||
      !bank_account_id ||
      !merchant_id ||
      !payment_method_id ||
      !user_id
    ) {
      return res.status(400).json({ msg: "Missing field(s), check again" });
    }

    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ msg: "Savings not found" });
    }

    try {
      // Check if the user is authorized to update the object
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user ID in the object
        expense.user = decoded.user.id;

        // Update the object
        expense.amount = amount;
        expense.date = date;
        expense.category_id = category_id;
        expense.bank_account_id = bank_account_id;
        expense.merchant_id = merchant_id;
        expense.payment_method_id = payment_method_id;
        expense.user_id = user_id;
        expense.description = description;
        const updatedExpense = await expense.save();

        // Send the updated response
        res.json(updatedExpense);
      } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  //   Delete a object
  deleteExpense: async (req, res) => {
    try {
      // Check if the object exists
      const expense = await Expense.findById(req.params.id);
      if (!expense) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Check if the user is authorized to delete the object
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user ID in the object object
        expense.user = decoded.user.id;

        // Delete the object
        await expense.remove();

        // Send the deleted response
        res.json({ msg: "User removed" });
      } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};
