const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a project name"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
