const mongoose = require("mongoose");
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
