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

// @desc    Update project
// @route   PUT /api/project/:id
// @access  Private
const editProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const { name, description } = req.body;

  let updatedProject;

  if (description) {
    updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name: name, description: description },
      { new: true }
    );
  } else {
    updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name: name, $unset: { description: "" } },
      { new: true }
    );
  }

  res.status(200).json(updatedProject);
});

// @desc    Add task to project
// @route   POST /api/project/addTask
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  const { project, description, completed } = req.body;
  const task = await Task.create({
    project: project,
    description: description,
    completed: completed,
  });

  if (!task) {
    res.status(400);
    throw new Error("Error adding task");
  }

  await Project.findByIdAndUpdate(project, { $inc: { taskCount: 1 } });

  res.status(200).json(task);
});

// @desc    Delete task from project
// @route   POST /api/project/deleteTask
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.body;
  const task = await Task.findByIdAndDelete(taskId);
  await Project.findByIdAndUpdate(projectId, { $inc: { taskCount: -1 } });

  res.status(200).json(task);
});

// @desc    Edit task in project
// @route   POST /api/project/editTask
// @access  Private
const editTask = asyncHandler(async (req, res) => {
  const { projectId, taskId, description, completed } = req.body;
  const task = await Task.findByIdAndUpdate(
    taskId,
    { description: description, completed: completed },
    { returnDocument: "after" }
  );

  if (!task) {
    res.status(400);
    throw new Error("Error while updating task");
  }

  res.status(200).json(task);
});

module.exports = {
  getData,
  editProject,
  addTask,
  deleteTask,
  editTask,
};
