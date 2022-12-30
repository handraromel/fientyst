const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up the app's middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the app's routes
app.use(require("./routes"));

// Catch-all route to handle any requests that don't match any of the above routes
app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
