const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const PaymentMethod = require("../models/PaymentMethod");

dotenv.config();

module.exports = {
  // Add a new object
  addPaymentMethod: async (req, res) => {
    // Validate the request body
    const { payment_type, name, account_number, user_id } = req.body;

    if (!payment_type || !name || !account_number || !user_id) {
      return res.status(400).json({ msg: "Missing field(s), check again" });
    }

    // Check if the object already exists
    const methodExist = await PaymentMethod.findOne({
      name: req.body.name,
    });

    if (methodExist) {
      return res.status(400).json({ msg: "Payment method already exists" });
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
        const newMerchant = new PaymentMethod({
          payment_type,
          name,
          account_number,
          user_id,
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
  getPaymentMethods: async (req, res) => {
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
        const paymentMethods = await PaymentMethod.find();
        res.json(paymentMethods);
      } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // Update a object
  updatePaymentMethod: async (req, res) => {
    // Validate the request body
    const { payment_type, name, account_number, user_id } = req.body;

    if (!payment_type || !name || !account_number || !user_id) {
      return res.status(400).json({ msg: "Missing field(s), check again" });
    }

    const paymentMethod = await PaymentMethod.findById(req.params.id);
    if (!paymentMethod) {
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
        paymentMethod.user = decoded.user.id;

        // Update the object
        paymentMethod.payment_type = payment_type;
        paymentMethod.name = name;
        paymentMethod.account_number = account_number;
        paymentMethod.user_id = user_id;
        const updatedPaymentMethod = await paymentMethod.save();

        // Send the updated response
        res.json(updatedPaymentMethod);
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
  deletePaymentMethod: async (req, res) => {
    try {
      // Check if the object exists
      const paymentMethod = await PaymentMethod.findById(req.params.id);
      if (!paymentMethod) {
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
        paymentMethod.user = decoded.user.id;

        // Delete the object
        await paymentMethod.remove();

        // Send the deleted response
        res.json({ msg: "Payment method data removed" });
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
