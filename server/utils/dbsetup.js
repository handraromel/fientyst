const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "local.env" });

const url = process.env.MONGODB_URI;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect
  .then((db) => {})
  .catch((err) => {
    console.log(err);
  });
