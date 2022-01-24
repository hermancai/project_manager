const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerSchema = require("../joiSchemas/registerSchema");
const verifyJWT = require("../middleware/verify");

// Login existing user
router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) return res.json({ error: "Missing credentials" });

  // Check if username exists
  User.findOne({ username: username }).then((dbUser) => {
    if (!dbUser) return res.json({ error: "Username is not registered" });

    // Compare given password with registered password
    bcrypt.compare(password, dbUser.password).then((correctPassword) => {
      if (!correctPassword) return res.json({ error: "Incorrect password" });
      return res.json({
        token: signJWT({
          id: dbUser._id,
          username: dbUser.username,
        }),
      });
    });
  });
});

// Register new user
router.post("/register", async (req, res) => {
  // Validate input
  const { username, password, confirmPassword } = req.body;
  const { error } = registerSchema.validate({ username, password, confirmPassword });
  if (error) return res.json({ error: error.details[0].message });

  // Check if username has been taken
  const takenUsername = await User.findOne({ username: username });
  if (takenUsername) return res.json({ error: "Username is taken" });

  // Encrypt password
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  // Add new user to database
  new User({
    username: username,
    password: encryptedPassword,
  }).save();

  return res.json({ token: signJWT(username) });
});

// Login with guest account
router.post("/guest", (req, res) => {
  User.findOne({ username: "Guest" }).then((dbUser) => {
    if (!dbUser) return res.status(404).json({ error: "Guest account does not exist" });

    return res.json({
      token: signJWT({
        id: dbUser._id,
        username: dbUser.username,
      }),
    });
  });
});

// Verify client JWT
router.post("/verifyUser", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

// Sign client token
function signJWT(payload) {
  return "Bearer " + jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 });
}

module.exports = router;
