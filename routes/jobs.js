import express from "express";

import {
  create,
  deleteJob,
  read,
  readByEmployerId,
  updateJob,
} from "../controllers/jobs.js";
import { verifyEmployer, verifyToken } from "../middleware/verify.js";

const router = express.Router();

router.route("/createJob").post(verifyEmployer, create);

router.route("/readJobs").get(verifyToken, read);

router
  .route("/readByEmployerId/:employerId")
  .get(verifyEmployer, readByEmployerId);

router.route("/updateJob/:jobId/:employerId").patch(verifyEmployer, updateJob);

router.route("/deleteJob/:jobId").delete(verifyEmployer, deleteJob);

export default router;
