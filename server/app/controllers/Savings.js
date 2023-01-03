const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Saving = require("../models/Saving");

dotenv.config();

module.exports = {
  // Add a new saving
  addSaving: async (req, res) => {
    // Validate the request body
    const { month, year, amount } = req.body;

    if (!month || !year || !amount) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    try {
      // Check if the user is authorized to create a new saving
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user from the decoded token as the user for the new saving
        const user = decoded.user;

        // Create the new saving
        const newSaving = new Saving({
          month,
          year,
          amount,
          user: user.id,
        });

        // Save the new saving to the database
        const savedSaving = await newSaving.save();

        res.json(savedSaving);
      } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

//   Get all savings
    getSavings: async (req, res) => {
      try {
        // Check if the user is authorized to get saving
        const token = req.header("x-auth-token");
        if (!token) {
          return res.status(401).json({ msg: "No token, authorization denied" });
        }

        try {
          // Verify the token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded.user;

          // Get all savings
          const savings = await Saving.find();
          res.json(savings);
        } catch (err) {
          return res.status(401).json({ msg: "Token is not valid" });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    },

  // Update a saving
    updateSaving: async (req, res) => {
      // Validate the request body
      const { month, year, amount } = req.body;

      if (!month || !year || !amount) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      try {
        // Check if the user is authorized to update the saving
        const token = req.header("x-auth-token");
        if (!token) {
          return res
            .status(401)
            .json({ msg: "No token, authorization denied" });
        }

        try {
          // Verify the token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          // Set the user ID in the saving object
          saving.user = decoded.user.id;

          // Update the saving
          saving.month = month;
          saving.year = year;
          saving.amount = amount;
          const updatedSaving = await saving.save();

          // Send the updated response
          res.json(updatedSaving);
        } catch (err) {
          console.error(err.message);
          return res.status(401).json({ msg: "Token is not valid" });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    },

//   Delete a saving
    deleteSaving: async (req, res) => {
      try {
        // Check if the saving exists
        const saving = await Saving.findById(req.params.id);
        if (!saving) {
          return res.status(404).json({ msg: "Category not found" });
        }

        // Check if the user is authorized to delete the saving
        const token = req.header("x-auth-token");
        if (!token) {
          return res.status(401).json({ msg: "No token, authorization denied" });
        }

        try {
          // Verify the token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          // Set the user ID in the saving object
          saving.user = decoded.user.id;

          // Delete the saving
          await saving.remove();

          // Send the deleted response
          res.json({ msg: "Saving data removed" });
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
