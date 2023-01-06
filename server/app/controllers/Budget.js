const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Budget = require("../models/Budget");

dotenv.config();

module.exports = {
  // Add a new object
  addBudget: async (req, res) => {
    // Validate the request body
    const { month, year, amount, description } = req.body;

    if (!month || !year || !amount) {
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
        const newBudget = new Budget({
          month,
          year,
          amount,
          description,
          user: user.id,
        });

        // Save the new object to the database
        const savedBudget = await newBudget.save();

        res.json(savedBudget);
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
  getBudgets: async (req, res) => {
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
        const budgets = await Budget.find();
        res.json(budgets);
      } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Update a object
  updateBudget: async (req, res) => {
    // Validate the request body
    const { month, year, amount, description } = req.body;

    if (!month || !year || !amount) {
      return res.status(400).json({ msg: "Missing field(s), check again" });
    }

    const budget = await Budget.findById(req.params.id);
    if (!budget) {
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

        // Set the user ID in the object object
        budget.user = decoded.user.id;

        // Update the object
        budget.month = month;
        budget.year = year;
        budget.amount = amount;
        budget.description = description;
        const updatedBudget = await budget.save();

        // Send the updated response
        res.json(updatedBudget);
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
  deleteBudget: async (req, res) => {
    try {
      // Check if the object exists
      const budget = await Budget.findById(req.params.id);
      if (!budget) {
        return res.status(404).json({ msg: "Budget not found" });
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
        budget.user = decoded.user.id;

        // Delete the object
        await budget.remove();

        // Send the deleted response
        res.json({ msg: "Budget removed" });
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
