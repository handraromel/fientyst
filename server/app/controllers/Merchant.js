const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Merchant = require("../models/Merchant");

dotenv.config();

module.exports = {
  // Add a new object
  addMerchant: async (req, res) => {
    // Validate the request body
    const { merchant_type, name, address, phone_number } = req.body;

    if (!merchant_type || !name || !address) {
      return res.status(400).json({ msg: "Missing field(s), check again" });
    }

    // Check if the object already exists
    const merchantExists = await Merchant.findOne({
      name: req.body.name,
    });

    if (merchantExists) {
      return res.status(400).json({ msg: "Merchant already exists" });
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
        const newMerchant = new Merchant({
          merchant_type,
          name,
          address,
          phone_number,
          user: user.id,
        });

        // Save the new object to the database
        const savedMerchant = await newMerchant.save();

        res.json(savedMerchant);
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
  getMerchants: async (req, res) => {
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
        const merchants = await Merchant.find();
        res.json(merchants);
      } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Update a object
  updateMerchant: async (req, res) => {
    // Validate the request body
    const { merchant_type, name, address, phone_number } = req.body;

    if (!merchant_type || !name || !address || !phone_number) {
      return res.status(400).json({ msg: "Missing field(s), check again" });
    }

    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) {
      return res.status(404).json({ msg: "Merchant not found" });
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
        merchant.user = decoded.user.id;

        // Update the object
        merchant.merchant_type = merchant_type;
        merchant.name = name;
        merchant.address = address;
        merchant.phone_number = phone_number;
        const updatedMerchant = await merchant.save();

        // Send the updated response
        res.json(updatedMerchant);
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
  deleteMerchant: async (req, res) => {
    try {
      // Check if the object exists
      const merchant = await Merchant.findById(req.params.id);
      if (!merchant) {
        return res.status(404).json({ msg: "Merchant not found" });
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
        merchant.user = decoded.user.id;

        // Delete the object
        await merchant.remove();

        // Send the deleted response
        res.json({ msg: "Merchant data removed" });
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
