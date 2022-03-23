const router = require("express").Router();
const { verifyUser } = require("../middleware/verifyMiddleware");

const { getData, addTask, deleteTask, editTask } = require("../controllers/projectController");

router.route("/").post(verifyUser, getData);
router.route("/addTask").post(verifyUser, addTask);
router.route("/deleteTask").post(verifyUser, deleteTask);
router.route("/editTask").post(verifyUser, editTask);

module.exports = router;
