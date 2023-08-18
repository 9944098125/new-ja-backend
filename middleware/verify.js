import jwt from "jsonwebtoken";
import db from "../databaseConnection/db.js";

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
    req.user = decoded;
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(400).json({ message: "Not Authorized" });
    }
  });
};

export const verifyJobOwner = (req, res, next) => {
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
    console.log(decoded);
    const { jobId } = req.params;
    const sql = "SELECT user_id FROM jobs WHERE id = ?";
    db.query(sql, [jobId], (err, result) => {
      if (err) {
        return res.status(404).json({ message: "Some internal error" });
      } else if (result.length >= 0) {
        console.log(result[0].user_id);
        const ownerId = result[0].user_id;
        req.user = decoded;
        console.log(req.user);
        if (req.user.isAdmin) {
          if (req.user.userId === ownerId) {
            next();
          } else {
            return res.status(403).json({ message: "Not Authorized!!" });
          }
        } else {
          return res.status(400).json({ message: "Not Authorized" });
        }
      }
    });
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
