const router = require("express").Router();
const { verifyUser } = require("../middleware/verifyMiddleware");

const { getData, addTask, deleteTask, editTask, editProject } = require("../controllers/projectController");

router.route("/").post(verifyUser, getData).put(verifyUser, editProject);
router.route("/task").post(verifyUser, addTask).delete(verifyUser, deleteTask).put(verifyUser, editTask);

module.exports = router;
