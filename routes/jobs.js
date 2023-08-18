import express from "express";

import {
  create,
  deleteJob,
  read,
  readByEmployerId,
  readJobById,
  updateJob,
} from "../controllers/jobs.js";
import {
  verifyEmployer,
  verifyJobOwner,
  verifyToken,
} from "../middleware/verify.js";

const router = express.Router();

router.route("/createJob").post(verifyEmployer, create);

router.route("/readJobs").get(verifyToken, read);

router.route("/readJobById/:jobId").get(verifyToken, readJobById);

router
  .route("/readByEmployerId/:employerId")
  .get(verifyEmployer, readByEmployerId);

router.route("/updateJob/:jobId/:employerId").patch(verifyJobOwner, updateJob);

router.route("/deleteJob/:jobId").delete(verifyJobOwner, deleteJob);

export default router;
