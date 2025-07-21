const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log("Auth middleware called");

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);

    req.user = { _id: decoded.userId };

    next();
  } catch (err) {
    console.log("Token invalid:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// console.log("Decoded User ID:", decoded.userId);
// req.user = { _id: decoded.userId };


module.exports = auth;
