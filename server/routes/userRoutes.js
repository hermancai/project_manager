const router = require("express").Router();
const { verifyUser } = require("../middleware/verifyMiddleware");
const { registerUser, loginUser, getUserData } = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/data", verifyUser, getUserData);

module.exports = router;
