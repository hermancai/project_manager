const router = require("express").Router();
const { verifyUser } = require("../middleware/verifyMiddleware");

const { getData, addTask, deleteTask } = require("../controllers/projectController");

router.route("/").post(verifyUser, getData);
router.route("/addTask").post(verifyUser, addTask);
router.route("/deleteTask").post(verifyUser, deleteTask);

module.exports = router;
