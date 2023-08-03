import jwt from "jsonwebtoken";

export const verifyEmployer = (req, res, next) => {
  // taking token from request headers in authorization and splitting it to retrieve token only
  // req.headers.authorization => Bearer -------token----------
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    // if no token it gives error
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  // verifying the token received with our token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token." });
    }

    // Attach the decoded payload to the request object for use in subsequent middleware or routes
    req.user = decoded;
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(400).json({ message: "Not Authorized" });
    }
  });
};

export const verifyToken = (req, res, next) => {
  // taking token from request headers in authorization and splitting it to retrieve token only
  // req.headers.authorization => Bearer -------token----------
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    // if no token it gives error
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  // verifying the token received with our token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token." });
    }

    // Attach the decoded payload to the request object for use in subsequent middleware or routes
    req.user = decoded;
    // decoded returns userId, isAdmin and iat
    next();
  });
};
