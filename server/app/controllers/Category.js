const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Category = require("../models/Category");

dotenv.config();

module.exports = {
  // Add a new object
  addCategory: async (req, res) => {
    // Validate the request body
    if (!req.body.categoryName) {
      return res.status(400).json({ msg: "Name field is required" });
    }

    try {
      // Check if the object already exists
      const categoryExists = await Category.findOne({
        category_name: req.body.categoryName,
      });

      if (categoryExists) {
        return res.status(400).json({ msg: "Category already exists" });
      }

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
        const newCategory = new Category({
          category_name: req.body.categoryName,
          user: user.id,
        });

        // Save the new object to the database
        const savedCategory = await newCategory.save();

        res.json(savedCategory);
      } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Get all objects
  getCategories: async (req, res) => {
    try {
      // Check if the user is authorized to get categories
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Get all categories
        const categories = await Category.find();
        res.json(categories);
      } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Update a object
  updateCategory: async (req, res) => {
    // Validate the request body
    if (!req.body.categoryName) {
      return res.status(400).json({ msg: "Category name is required" });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
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
        category.user = decoded.user.id;

        // Update the object
        category.category_name = req.body.categoryName;
        const updatedCategory = await category.save();

        // Send the updated response
        res.json(updatedCategory);
      } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Delete a object
  deleteCategory: async (req, res) => {
    try {
      // Check if the object exists
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
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
        category.user = decoded.user.id;

        // Delete the object
        await category.remove();

        // Send the deleted response
        res.json({ msg: "Category removed" });
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
