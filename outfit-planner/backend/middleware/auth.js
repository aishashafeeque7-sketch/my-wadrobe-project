// This middleware checks if the user sent a valid login token
// We use it to "protect" routes so only logged-in users can use them

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // The frontend sends the token like this: "Bearer xxxxxxx"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1]; // take the part after "Bearer "

  try {
    // This checks the token is real and was made by our server
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // We save the user id on the request so our routes can use it
    req.userId = decoded.userId;

    next(); // token is good, let the request continue
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect;
