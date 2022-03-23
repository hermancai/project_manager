const router = require("express").Router();
const { verifyUser } = require("../middleware/verifyMiddleware");

const { getProjects, createProject, deleteProject } = require("../controllers/projectsController");

router.route("/").get(verifyUser, getProjects).post(verifyUser, createProject);
router.route("/:id").delete(verifyUser, deleteProject);

module.exports = router;
