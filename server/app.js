const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
require("./utils/dbsetup");

const app = express();

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

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
