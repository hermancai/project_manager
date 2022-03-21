const router = require("express").Router();
const { verifyUser } = require("../middleware/verifyMiddleware");

const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectsController");

router.route("/").get(verifyUser, getProjects).post(verifyUser, createProject);
router.route("/:id").put(verifyUser, updateProject).delete(verifyUser, deleteProject);

module.exports = router;
