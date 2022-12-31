const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load User model
const User = require("../models/User");

dotenv.config();

module.exports = {
  register: async (req, res) => {
    // Destructure request body
    const { username, password, email, first_name, last_name, phone_number } =
      req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
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
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  },
  login: async (req, res) => {
    try {
      // Destructure request body
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid user credentials" });
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // console.log(user.password);
        // console.log(password);
        return res.status(400).json({ msg: "Invalid pass credentials" });
      }

      // Create payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  getAllUser: async (req, res) => {
    try {
      //   const user = await User.findById(req.user.id).select("-password");
      const user = await User.find().select("-password -is_admin");
      //   const userId = user._id.toString();
      //   res.json({ userId });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};
