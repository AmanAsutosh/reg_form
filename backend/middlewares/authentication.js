const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.MY_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ msg: "Session expired or invalid token" });
    }

    req.user = decodedUser;
    next();
  });
}

module.exports = auth;