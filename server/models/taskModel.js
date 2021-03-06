const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
