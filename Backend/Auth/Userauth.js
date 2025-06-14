const jwt = require("jsonwebtoken");

const AuthenticateUser = (req, res, next) => {
  let token = req.cookies.token;
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, "12345");
    req.user = decoded;
    req.id = decoded.id;
    // console.log((req.user));

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired token" });
  }
};

module.exports = AuthenticateUser;
