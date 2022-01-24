const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.json({ error: "Missing token", isLoggedIn: false });

  const slicedToken = token.split(" ")[1];
  jwt.verify(slicedToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        error: "Token verification failed",
        isLoggedIn: false,
      });
    }
    req.user = { id: decoded.id, username: decoded.username };
    next();
  });
};

module.exports = verifyJWT;
