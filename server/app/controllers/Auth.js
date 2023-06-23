const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load User model
const User = require("../models/User");

dotenv.config();

module.exports = {
  register: async (req, res) => {
    // Destructure request body
    const {username, password, email, first_name, last_name, phone_number} = req.body;

    if (!username || !password || !email || !first_name || !last_name) {
      return res.status(400).json({msg: "Missing field(s), check again"});
    }

    // Check if user exists
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({msg: "Email already exists"});
    }

    // Check if username already exists
    user = await User.findOne({username});
    if (user) {
      return res.status(400).json({msg: "Username already exists"});
    }

    // Create new user
    user = new User({
      username,
      password,
      email,
      first_name,
      last_name,
      phone_number,
    });

    // Hash password
    const salt = 10;
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Create payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign token
    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 86400}, (err, token) => {
      if (err) throw err;
      res.json({token});
    });
  },
  login: async (req, res) => {
    try {
      // Destructure request body
      const {email, password} = req.body;

      // Check if user exists
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({msg: "Invalid user credentials"});
      }

      if (!user.is_active) {
        return res.status(400).json({msg: "User is not active, please contact administrator"});
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({msg: "Invalid pass credentials"});
      }

      // Create payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign token
      jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 86400}, (err, token) => {
        if (err) throw err;
        res.json({token});
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};
