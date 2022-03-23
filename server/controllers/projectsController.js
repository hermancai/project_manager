const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const Bug = require("../models/bugModel");

// @desc    Get projects
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user.id });

  res.status(200).json(projects);
});

// @desc    Post project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please enter a project name");
  }

  const project = await Project.create({
    name: req.body.name,
    description: req.body.description,
    user: req.user.id,
  });

  res.status(200).json(project);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId);

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

  await project.remove();
  await Task.deleteMany({ project: projectId });
  await Bug.deleteMany({ project: projectId });

  res.status(200).json(project);
});

module.exports = {
  getProjects,
  createProject,
  deleteProject,
};
