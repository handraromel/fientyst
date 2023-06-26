const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/User");

dotenv.config();

module.exports = {
  //   Get all users
  getUsers: async (req, res) => {
    try {
      // Check if the user is authorized to get object
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({msg: "No token, authorization denied"});
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Get all objects
        const users = await User.find();
        res.json(users);
      } catch (err) {
        return res.status(401).json({msg: "Token is not valid"});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Get a specific user by ID
  getUserById: async (req, res) => {
    try {
      // Check if the user is authorized to get the user
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({msg: "No token, authorization denied"});
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Get the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({msg: "User not found"});
        }

        res.json(user);
      } catch (err) {
        return res.status(401).json({msg: "Token is not valid"});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Toggle the active status of a user
  toggleUserStatus: async (req, res) => {
    try {
      // Check if the user is authorized to toggle the status
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({msg: "No token, authorization denied"});
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({msg: "User not found"});
        }

        // Toggle the is_active property
        user.is_active = !user.is_active;

        // Save the updated user
        const updatedUser = await user.save();

        res.json(updatedUser);
      } catch (err) {
        return res.status(401).json({msg: "Token is not valid"});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Update a saving
  updateUser: async (req, res) => {
    // Validate the request body
    const {username, password, email, first_name, last_name, phone_number} = req.body;

    if (!username || !password || !email || !first_name || !last_name) {
      return res.status(400).json({msg: "Missing field(s), check again"});
    }

    const userData = await User.findById(req.params.id);
    if (!userData) {
      return res.status(404).json({msg: "User not found"});
    }

    try {
      // Check if the user is authorized
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({msg: "No token, authorization denied"});
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user ID in the object
        userData.user = decoded.user.id;

        // Hash the password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Update the object
        userData.username = username;
        userData.password = hashedPassword;
        userData.email = email;
        userData.first_name = first_name;
        userData.last_name = last_name;
        userData.phone_number = phone_number;
        const updatedUser = await userData.save();

        // Send the updated response
        res.json(updatedUser);
      } catch (err) {
        console.error(err.message);
        return res.status(401).json({msg: "Token is not valid"});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  //   Delete an object
  deleteUser: async (req, res) => {
    try {
      // Check if the object exists
      const userData = await User.findById(req.params.id);
      if (!userData) {
        return res.status(404).json({msg: "User not found"});
      }

      // Check if the user is authorized to delete the object
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({msg: "No token, authorization denied"});
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user ID in the object
        userData.user = decoded.user.id;

        // Delete the object
        await userData.remove();

        // Send the deleted response
        res.json({msg: "User data removed"});
      } catch (err) {
        console.error(err.message);
        return res.status(401).json({msg: "Token is not valid"});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};
