const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Income = require("../models/Income");

dotenv.config();

module.exports = {
  // Add a new object
  addIncome: async (req, res) => {
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
        const newIncome = new Income({
          month,
          year,
          amount,
          description,
          user: user.id,
        });

        // Save the new object to the database
        const savedIncome = await newIncome.save();

        res.json(savedIncome);
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
  getIncomes: async (req, res) => {
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
        const incomes = await Income.find();
        res.json(incomes);
      } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Update a object
  updateIncome: async (req, res) => {
    // Validate the request body
    const { month, year, amount, description } = req.body;

    if (!month || !year || !amount) {
      return res.status(400).json({ msg: "Missing field(s), check again" });
    }

    const income = await Income.findById(req.params.id);
    if (!income) {
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
        income.user = decoded.user.id;

        // Update the object
        income.month = month;
        income.year = year;
        income.amount = amount;
        income.description = description;
        const updatedIncome = await income.save();

        // Send the updated response
        res.json(updatedIncome);
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
  deleteIncome: async (req, res) => {
    try {
      // Check if the object exists
      const income = await Income.findById(req.params.id);
      if (!income) {
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
        income.user = decoded.user.id;

        // Delete the object
        await income.remove();

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
