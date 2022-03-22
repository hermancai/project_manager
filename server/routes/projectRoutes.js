const router = require("express").Router();
const { verifyUser } = require("../middleware/verifyMiddleware");

const { getData, addTask } = require("../controllers/projectController");

router.route("/").post(verifyUser, getData);
router.route("/addTask").post(verifyUser, addTask);

module.exports = router;
