const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

// @desc    Get data for one project
// @route   POST /api/project
// @access  Private
const getData = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.body.id);
  res.status(200).json(project);
});

module.exports = {
  getData,
};
