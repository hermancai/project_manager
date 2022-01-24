const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// mongoose creates a model for the "users" collection. Note the plural
const User = mongoose.model("User", userSchema);

module.exports = User;
