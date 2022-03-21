const router = require("express").Router();
const { verifyUser } = require("../middleware/verifyMiddleware");

const { getData } = require("../controllers/projectController");

router.route("/").post(verifyUser, getData);

module.exports = router;
