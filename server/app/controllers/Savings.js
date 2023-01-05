const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Saving = require("../models/Saving");

dotenv.config();

module.exports = {
  // Add a new object
  addSaving: async (req, res) => {
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
        const newSaving = new Saving({
          month,
          year,
          amount,
          description,
          user: user.id,
        });

        // Save the new object to the database
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

  //   Get all objects
  getSavings: async (req, res) => {
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

  // Update a object
  updateSaving: async (req, res) => {
    // Validate the request body
    const { month, year, amount, description } = req.body;

    if (!month || !year || !amount) {
      return res.status(400).json({ msg: "Missing field(s), check again" });
    }

    const saving = await Saving.findById(req.params.id);
    if (!saving) {
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
        saving.user = decoded.user.id;

        // Update the object
        saving.month = month;
        saving.year = year;
        saving.amount = amount;
        saving.description = description;
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

  //   Delete a object
  deleteSaving: async (req, res) => {
    try {
      // Check if the object exists
      const saving = await Saving.findById(req.params.id);
      if (!saving) {
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
        saving.user = decoded.user.id;

        // Delete the object
        await saving.remove();

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
