const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Category = require("../models/Category");

dotenv.config();

module.exports = {
  // Add a new category
  addCategory: async (req, res) => {
    // Validate the request body
    if (!req.body.categoryName) {
      return res.status(400).json({ msg: "Name field is required" });
    }

    try {
      // Check if the category already exists
      const categoryExists = await Category.findOne({
        category_name: req.body.categoryName,
      });
      if (categoryExists) {
        return res.status(400).json({ msg: "Category already exists" });
      }

      // Check if the user is authorized to create a new category
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user from the decoded token as the user for the new category
        const user = decoded.user;

        // Create the new category
        const newCategory = new Category({
          category_name: req.body.categoryName,
          user: user.id,
        });

        // Save the new category to the database
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

  // Get all categories
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
      } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }

      // Get all categories
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Update a category
  updateCategory: async (req, res) => {
    // Validate the request body
    if (!req.body.categoryName) {
      return res.status(400).json({ msg: "Category name is required" });
    }

    try {
      // Check if the category exists
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }

      // Check if the user is authorized to update the category
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user ID in the category object
        category.user = decoded.user.id;

        // Update the category
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

  // Delete a category
  deleteCategory: async (req, res) => {
    try {
      // Validate the request body
      // if (!req.body.categoryName) {
      //   return res.status(400).json({ msg: "Name field is required" });
      // }

      // Check if the category exists
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }

      // Check if the user is authorized to delete the category
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set the user ID in the category object
        category.user = decoded.user.id;

        // Delete the category
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
