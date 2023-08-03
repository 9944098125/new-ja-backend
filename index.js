import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import jobsRoute from "./routes/jobs.js";

dotenv.config();

const app = express();
// parsing the express related data to json format
app.use(express.json());
// implementing cors to pass the browser security tests
app.use(cors());
// parsing the request bodies to json format
app.use(bodyParser.json());
// setting the extension of urlencoded to true so that it accepts nested objects too
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes here
app.use("/api/auth/", authRoute);
app.use("/api/jobs/", jobsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(chalk.bold.cyan(`App is now running on port ==> [${port}]`));
});
