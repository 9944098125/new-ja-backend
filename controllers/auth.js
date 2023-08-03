import db from "../databaseConnection/db.js";
import bcryptJs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendRegistrationEmail } from "../helpers/nodemailer.js";

export const register = (req, res) => {
  // taking the details request body
  const { name, email, password, image, about, isAdmin, dob } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Some Internal server error" });
    } else if (result.length > 0) {
      return res
        .status(403)
        .json({ message: "User with this email already exists..." });
    }
    const saltRounds = bcryptJs.genSaltSync(10);
    const hashedPassword = bcryptJs.hashSync(password, saltRounds);
    const sql =
      "INSERT INTO users (name, email, password, image, about, isAdmin, dob) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [name, email, hashedPassword, image, about, isAdmin, dob];
    db.query(sql, values, (err, response) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Internal error" });
      } else if (response.affectedRows === 0) {
        return res.status(400).json({ message: "No Table Found" });
      } else {
        sendRegistrationEmail(email);
        // console.log(email);
        res.status(201).json({
          message: `Thank you ${name?.split(" ")[0]} for registering with us`,
        });
      }
    });
  });
};

export const login = (req, res) => {
  // taking request body
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(403).json({ message: "Internal error" });
    }
    const user = result[0];
    if (!user) {
      return res.status(403).json({ message: "User Not Found" });
    }
    bcryptJs.compare(password, user.password, (err, response) => {
      if (err) {
        return res.status(403).json({ message: "Internal error" });
      } else if (!response) {
        return res.status(400).json({ message: "Wrong Password" });
      }
      const userId = user.id;
      const isAdmin = user.isAdmin;
      const token = jwt.sign({ userId, isAdmin }, process.env.SECRET_KEY);
      res.status(200).json({
        message: "Login Success",
        user: user,
        token: token,
      });
    });
  });
};
