import mysql from "mysql2";
import chalk from "chalk";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Srinivas@8",
  database: "jobby_app",
});

db.getConnection((err) => {
  if (err) {
    console.log(chalk.bold.red("Failed to connect with database"));
  } else {
    console.log(chalk.bold.white("Successfully connected to database"));
  }
});
export default db;
