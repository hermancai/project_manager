const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const Bug = require("../models/bugModel");

// @desc    Get data for one project
// @route   POST /api/project
// @access  Private
const getData = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.body.id);
  const tasks = await Task.find({ project: req.body.id });
  const bugs = await Bug.find({ project: req.body.id });

  res.status(200).json({
    project: project,
    tasks: tasks,
    bugs: bugs,
  });
});

// @desc    Add task to project
// @route   POST /api/project/addTask
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  const { project, description } = req.body;
  const task = await Task.create({
    project: project,
    description: description,
  });

  if (!task) {
    res.status(400);
    throw new Error("Error adding task");
  }

  await Project.findByIdAndUpdate(project, { $inc: { taskCount: 1 } });

  res.status(200).json(task);
});

module.exports = {
  getData,
  addTask,
};
