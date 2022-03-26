const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

// @desc    Get data for one project
// @route   POST /api/project
// @access  Private
const getData = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.body.id);
  const tasks = await Task.find({ project: req.body.id });

  res.status(200).json({
    project: project,
    tasks: tasks,
  });
});

// @desc    Update project
// @route   PUT /api/project/
// @access  Private
const editProject = asyncHandler(async (req, res) => {
  const { id, name, description } = req.body;
  let project;

  if (description) {
    project = await Project.findByIdAndUpdate(
      id,
      { name: name, description: description },
      { new: true }
    );
  } else {
    project = await Project.findByIdAndUpdate(
      id,
      { name: name, $unset: { description: "" } },
      { new: true }
    );
  }

  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }

  res.status(200).json(project);
});

// @desc    Add task to project
// @route   POST /api/project/task
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  const { project, description, completed, priority } = req.body;
  const task = await Task.create({
    project: project,
    description: description,
    completed: completed,
    priority: priority,
  });

  if (!task) {
    res.status(400);
    throw new Error("Error adding task");
  }

  await Project.findByIdAndUpdate(project, {
    $inc: { incompleteTaskCount: completed ? 0 : 1, totalTaskCount: 1 },
  });

  res.status(200).json(task);
});

// @desc    Delete task from project
// @route   DELETE /api/project/task
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId, completed } = req.body;
  const task = await Task.findByIdAndDelete(taskId);
  await Project.findByIdAndUpdate(projectId, {
    $inc: { incompleteTaskCount: completed ? 0 : -1, totalTaskCount: -1 },
  });

  res.status(200).json(task);
});

// @desc    Edit task in project
// @route   PUT /api/project/task
// @access  Private
const editTask = asyncHandler(async (req, res) => {
  const { projectId, taskId, description, completed, priority } = req.body;

  const task = await Task.findById(taskId);
  await Project.findByIdAndUpdate(projectId, {
    $inc: {
      incompleteTaskCount:
        task.completed === completed ? 0 : completed ? -1 : 1,
    },
  });

  task.description = description;
  task.completed = completed;
  task.priority = priority;
  await task.save();

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
